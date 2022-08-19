import { Module } from '@nestjs/common';
import { AppController } from './learning/app.controller';
import { AppService } from './learning/app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
