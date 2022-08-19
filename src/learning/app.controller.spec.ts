import { Test, TestingModule } from '@nestjs/testing';
import { AppModel } from './app-model';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "{"message": "Hello Nest"}"', () => {
      expect(appController.getHello()).toEqual(new AppModel('Hello Nest'));
    });
  });
});
