/* eslint-disable prettier/prettier */
import { Module, MiddlewareConsumer  } from '@nestjs/common';
import { AuthorizationMiddleware } from '../middleware/authorization.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';

@Module({
  // imports: []
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude('user/login')
      .forRoutes('user');
  }
}