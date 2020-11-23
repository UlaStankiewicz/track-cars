import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CarModule } from './car/car.module';

@Module({
  imports: [ScheduleModule.forRoot(), CarModule],
})
export class AppModule {}
