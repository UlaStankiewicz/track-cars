import { ApiProperty } from '@nestjs/swagger';
import { Log } from './log';

export class TrackCarsResponse {
  @ApiProperty({ type: [Log] })
  data: Log[];
  // pageNumber: number;
}
