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
      this.allCars = this.generatorService.createCars(10);
      this.updateHistory(this.generatorService.initHistory(this.allCars));
    } else {
      this.updateHistory(this.generatorService.generateHistoryUpdate(this.allCars, this.carsHistory));
    }
  }

  private updateHistory(update: Log[]): void {
    this.carsHistory = this.carsHistory.concat(update);
  }
}
