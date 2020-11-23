import { Injectable } from '@nestjs/common';
import { Car } from '../schema/car';
import { Log } from '../schema/log';

@Injectable()
export class GeneratorService {
  private carHistory: Log[] = [];

  private readonly carCount = 3;
  private readonly availableCarsModels = [
    { brand: 'Peugeot', model: 'Boxer' },
    { brand: 'Peugeot', model: 'Partner' },
    { brand: 'Ford', model: 'Transit' },
    { brand: 'Citroen', model: 'Jumper' },
    { brand: 'Opel', model: 'Vivaro' },
    { brand: 'Renault', model: 'Master' },
  ];

  createCars(): Car[] {
    const cars: Car[] = [];
    for (let i = 0; i < this.carCount; i++) {
      const randomCarModel = this.availableCarsModels[Math.floor(Math.random() * this.availableCarsModels.length)];
      const newCar: Car = {
        id: i,
        registrationNumber: `GD ${i}`,
        brand: randomCarModel.brand,
        model: randomCarModel.model,
      };
      cars.push(newCar);
    }

    return cars;
  }

  generateNewHistory(cars: Car[]): Log[] {
    if (cars && cars.length > 0) {
      console.log(cars);
      console.log(new Date());
    }

    return null;
  }
}
