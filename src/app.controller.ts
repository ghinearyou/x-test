import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
