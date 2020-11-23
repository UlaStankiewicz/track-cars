import { ApiProperty } from '@nestjs/swagger';
import { CarPosition } from './car-position';

export class TrackCarsResponse {
  @ApiProperty({ type: [CarPosition] })
  data: CarPosition[];
}
