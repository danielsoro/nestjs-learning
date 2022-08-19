import { Module } from '@nestjs/common';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { AppController } from './learning/app.controller';
import { AppService } from './learning/app.service';

@Module({
  imports: [],
  controllers: [AppController, CoffeesController],
  providers: [AppService, CoffeesService],
})
export class AppModule {}
