import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { errorMessage } from '../middleware/authorization.middleware';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(params): Promise<User[]> {
    const take = params.limit ? parseInt(params.limit) : 10;
    const skip = params.page ? (params.page - 1) * take : 0;

    const result = await this.prisma.user.findMany({
      skip,
      take,
    });
    return result;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User | errorMessage> {
    data.password = await bcrypt.hash(data.password, 10);

    const checkEmail = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (checkEmail) return { message: 'Email already used' };

    return this.prisma.user.create({ data });
  }

  async loginUser(data): Promise<User | errorMessage> {
    const result = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (!result) return { message: 'User not found' };

    const isMatch = await bcrypt.compare(data.password, result.password);
    if (!isMatch) return { message: 'Wrong password' };

    const now = new Date();
    now.setHours(now.getHours() + 2);

    result['expired'] = now;
    result['token'] = result.id + '|' + result.email + '|' + now.toISOString();
    return result;
  }
}
