import { ApiProperty } from '@nestjs/swagger';
import { Car } from './car';
import { Coordinates } from './coordinates';

export class CarPosition {
  @ApiProperty()
  id: number;
  @ApiProperty()
  timestamp: Date;
  @ApiProperty({ type: [Car] })
  car: Car;
  @ApiProperty({ type: [Coordinates] })
  coordinates: Coordinates;
}
