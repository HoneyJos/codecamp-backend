import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const qqq = 3;

    const profile = {
      age: 13,
      she: 'hello',
    };

    return this.appService.qqq();
  }
}
