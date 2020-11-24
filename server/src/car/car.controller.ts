import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarPosition } from '../schema/car-position';
import { TrackCarsResponse } from '../schema/track-cars-response';
import { CarService } from './car.service';
import { TrackCarsQuery } from './schema/track-cars-query';

@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found images',
    type: TrackCarsResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No result found',
  })
  trackCars(@Query() trackCarsQuery: TrackCarsQuery): TrackCarsResponse {
    try {
      let carsPositions: CarPosition[] = this.carService.trackCars();

      if (trackCarsQuery.search && trackCarsQuery.search.length > 0) {
        console.log(`[LOG] Query - search text: ${trackCarsQuery.search}`);
        // TODO
      }

      if (trackCarsQuery.filters && trackCarsQuery.filters.length > 0) {
        console.log(`[LOG] Query - filters: ${trackCarsQuery.filters}`);
        carsPositions = this.carService.filterCars(carsPositions, trackCarsQuery.filters);
      }

      const result: TrackCarsResponse = {
        data: carsPositions,
      };

      return result;
    } catch (error) {
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
