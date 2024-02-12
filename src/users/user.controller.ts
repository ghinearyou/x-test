import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { errorMessage } from '../middleware/authorization.middleware';
import { CreateUserDto, LoginUserDto } from './dtos/user.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { User } from '@prisma/client';
import { ApiHeader } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiHeader({
    name: 'token',
    description: 'fill with token after login',
    required: true,
  })
  @Get()
  geUsers(
    @Query()
    query: PaginationDto,
  ): Promise<User[]> {
    return this.userService.getUsers(query);
  }

  @ApiHeader({
    name: 'token',
    description: 'fill with token after login',
    required: true,
  })
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
