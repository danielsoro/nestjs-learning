import { Injectable } from '@nestjs/common';
import { AppModel } from './app-model';

@Injectable()
export class AppService {
  getHello(): AppModel {
    return new AppModel('Hello Nest');
  }
}
