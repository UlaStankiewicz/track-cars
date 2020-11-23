import { INestApplication } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CarModule } from './../src/car/car.module';
import { Car } from './../src/schema/car';
import { Coordinates } from './../src/schema/coordinates';
import { Log } from './../src/schema/log';
import { TrackCarsResponse } from './../src/schema/track-cars-response';

describe('CarController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ScheduleModule.forRoot(), CarModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll((done) => {
    app.close();
    done();
  });

  it('should return cars init histories', async () => {
    const response = await request(app.getHttpServer()).get('/car').expect('Content-Type', /json/).expect(200);

    const result: TrackCarsResponse = response.body;
    expect(result.data.length).toBeGreaterThan(0);
    result.data.forEach((log: Log) => {
      expect(log.id).toBeDefined();
      expect(log.timestamp).toBeDefined();

      const coordinates: Coordinates = log.coordinates;
      expect(coordinates.longitude).toBeDefined();
      expect(coordinates.latitude).toBeDefined();

      const car: Car = log.car;
      expect(car.id).toBeDefined();
      expect(car.registrationNumber).toBeDefined();
      expect(car.brand).toBeDefined();
      expect(car.model).toBeDefined();
    });
  });
});
