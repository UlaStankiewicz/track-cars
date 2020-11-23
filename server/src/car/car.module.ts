import { Module } from '@nestjs/common';
import { GeneratorService } from 'src/generator/generator.service';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  controllers: [CarController],
  providers: [CarService, GeneratorService],
})
export class CarModule {}
