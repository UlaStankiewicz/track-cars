import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GeneratorService } from '../generator/generator.service';
import { Car } from '../schema/car';
import { CarPosition } from '../schema/car-position';

@Injectable()
export class CarService {
  private allCars: Car[] = [];
  private carsPositions: CarPosition[] = [];

  constructor(private readonly generatorService: GeneratorService) {
    this.allCars = this.generatorService.createCars(10);
    this.carsPositions = this.generatorService.initPositions(this.allCars);
  }

  trackCars(): CarPosition[] {
    return this.carsPositions;
  }

  getCars(): Car[] {
    return this.allCars;
  }

  @Cron('*/5 * * * * *')
  update(): void {
    this.carsPositions = this.generatorService.generateNewPositions(this.allCars, this.carsPositions);
  }
}
