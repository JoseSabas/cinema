import { IsInt, IsPositive } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @IsPositive()
  booker: number;

  @IsInt()
  @IsPositive()
  schedule: number;
}