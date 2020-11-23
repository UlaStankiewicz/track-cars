import { Module } from '@nestjs/common';
import { GeneratorModule } from '../generator/generator.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  imports: [GeneratorModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
