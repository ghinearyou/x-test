import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { errorMessage } from '../middleware/authorization.middleware';
import { CreateUserDto, LoginUserDto } from './dtos/user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  geUsers(
    @Query()
    query: {
      page: number;
      limit: number;
    },
  ): Promise<User[]> {
    return this.userService.getUsers(query);
  }

  @Post()
  createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | errorMessage> {
    return this.userService.createUser(createUserDto);
  }

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<User | errorMessage> {
    return this.userService.loginUser(loginUserDto);
  }
}
