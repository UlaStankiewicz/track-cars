import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackCarsResponse } from 'src/schema/track-cars-response';
import { CarService } from './car.service';

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
  trackCars(): TrackCarsResponse {
    try {
      const result: TrackCarsResponse = {
        data: this.carService.trackCars(),
      };
      return result;
    } catch (error) {
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
