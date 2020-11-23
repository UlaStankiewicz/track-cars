import { ApiProperty } from '@nestjs/swagger';

export class Car {
  @ApiProperty()
  id: number;
  @ApiProperty()
  registrationNumber: string;
  @ApiProperty()
  brand: string;
  @ApiProperty()
  model: string;
}
