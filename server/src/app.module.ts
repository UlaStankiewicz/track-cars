import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CarModule } from './car/car.module';
import { GeneratorModule } from './generator/generator.module';

@Module({
  imports: [ScheduleModule.forRoot(), CarModule, GeneratorModule],
})
export class AppModule {}
