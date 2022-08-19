import { Controller, Get } from '@nestjs/common';
import { AppModel } from './app-model';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): AppModel {
    return this.appService.getHello();
  }
}
