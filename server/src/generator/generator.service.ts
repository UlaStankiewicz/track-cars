import { Injectable } from '@nestjs/common';
import { Car } from '../schema/car';
import { Coordinates } from '../schema/coordinates';
import { Log } from '../schema/log';

@Injectable()
export class GeneratorService {
  private readonly longitudeMinLimit = 18.41;
  private readonly longitudeMaxLimit = 18.55;
  private readonly latitudeMinLimit = 54.29;
  private readonly latitudeMaxLimit = 54.56;
  private readonly availableCarsModels = [
    { brand: 'Peugeot', model: 'Boxer' },
    { brand: 'Peugeot', model: 'Partner' },
    { brand: 'Ford', model: 'Transit' },
    { brand: 'Citroen', model: 'Jumper' },
    { brand: 'Opel', model: 'Vivaro' },
    { brand: 'Renault', model: 'Master' },
  ];

  createCars(carCount = 10): Car[] {
    const cars: Car[] = [];
    for (let i = 0; i < carCount; i++) {
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

  initHistory(cars: Car[]): Log[] {
    const history: Log[] = [];
    if (cars && cars.length > 0) {
      for (let i = 0; i < cars.length; i++) {
        const log: Log = {
          id: i,
          car: cars[i],
          timestamp: new Date(),
          coordinates: {
            longitude: this.randomizeFlaotFromRange(this.longitudeMinLimit, this.longitudeMaxLimit),
            latitude: this.randomizeFlaotFromRange(this.latitudeMinLimit, this.latitudeMaxLimit),
          },
        };
        history.push(log);
      }
    }

    return history;
  }

  generateHistoryUpdate(cars: Car[], currentHistory: Log[]): Log[] {
    const historyUpdate: Log[] = [];
    if (cars && cars.length > 0) {
      for (let i = 0; i < cars.length; i++) {
        // 90% chance to move
        const shouldMove = Math.floor(Math.random() * 10) <= 8;

        if (shouldMove) {
          const carHistory = currentHistory.filter((h) => h.car.id === cars[i].id);
          const lastPosition = carHistory.reduce((a, b) => (a.timestamp > b.timestamp ? a : b)).coordinates;
          const newLog: Log = {
            id: currentHistory.length + i,
            car: cars[i],
            timestamp: new Date(),
            coordinates: this.randomNewCoordinates(lastPosition),
          };

          historyUpdate.push(newLog);
          console.log(`[LOG] Car with ID="${cars[i].id} has moved`);
        } else {
          console.log(`[LOG] Car with ID="${cars[i].id} did not move`);
        }
      }
    }

    return historyUpdate;
  }

  private randomizeFlaotFromRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private randomNewCoordinates(lastPosition: Coordinates): Coordinates {
    const newCoordinates: Coordinates = { ...lastPosition };

    // randomize between -0.006 and 0.006
    const threshold = 0.006;

    let leftLimit = lastPosition.longitude - threshold;
    if (leftLimit < this.longitudeMinLimit) {
      leftLimit = this.longitudeMinLimit;
    }
    let rightLimit = lastPosition.longitude + threshold;
    if (rightLimit > this.longitudeMaxLimit) {
      rightLimit = this.longitudeMaxLimit;
    }
    let topLimit = lastPosition.latitude + threshold;
    if (topLimit > this.latitudeMaxLimit) {
      topLimit = this.latitudeMaxLimit;
    }
    let bottomLimit = lastPosition.latitude - threshold;
    if (bottomLimit < this.latitudeMinLimit) {
      bottomLimit = this.latitudeMinLimit;
    }

    newCoordinates.longitude = this.randomizeFlaotFromRange(leftLimit, rightLimit);
    newCoordinates.latitude = this.randomizeFlaotFromRange(bottomLimit, topLimit);

    return newCoordinates;
  }
}
