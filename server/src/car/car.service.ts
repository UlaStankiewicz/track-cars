import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GeneratorService } from '../generator/generator.service';
import { Car } from '../schema/car';
import { Log } from '../schema/log';

@Injectable()
export class CarService {
  private allCars: Car[] = [];
  private carsHistory: Log[] = [];

  constructor(private readonly generatorService: GeneratorService) {}

  trackCars(): Log[] {
    return this.carsHistory;
  }

  getCars(): Car[] {
    return this.allCars;
  }

  @Cron('*/5 * * * * *')
  update(): void {
    if (this.allCars.length === 0) {
      this.allCars = this.generatorService.createCars();
    }

    console.log('todo: use generator - update history');
    this.generatorService.generateNewHistory(this.allCars);
  }
}
