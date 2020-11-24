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
    this.allCars = this.generatorService.createCars(15);
    this.carsPositions = this.generatorService.initPositions(this.allCars);
  }

  trackCars(): CarPosition[] {
    return this.carsPositions;
  }

  getCars(): Car[] {
    return this.allCars;
  }

  searchCars(cars: CarPosition[], registrationNumber: string): CarPosition[] {
    const found: CarPosition[] = [];

    cars.map((p) => {
      if (p.car.registrationNumber.toLocaleLowerCase().includes(registrationNumber.toLocaleLowerCase())) {
        found.push(p);
      }
    });

    return found;
  }

  filterCars(cars: CarPosition[], filtersQuery: string): CarPosition[] {
    const filteredCarsPositions: CarPosition[] = [];

    const filters = filtersQuery.split(',');
    filters.forEach((filter) => {
      const car = filter.split('-');
      if (car.length === 2) {
        const brand = car[0].trim();
        const model = car[1].trim();

        cars.map((p) => {
          if (
            p.car.brand.toLocaleLowerCase() === brand.toLocaleLowerCase() &&
            p.car.model.toLocaleLowerCase() === model.toLocaleLowerCase()
          ) {
            filteredCarsPositions.push(p);
          }
        });
      }
    });

    return filteredCarsPositions;
  }

  @Cron('*/5 * * * * *')
  update(): void {
    this.carsPositions = this.generatorService.generateNewPositions(this.allCars, this.carsPositions);
  }
}
