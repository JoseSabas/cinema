import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @IsPositive()
  booker: number;

  @IsInt()
  @IsPositive()
  schedule: number;
}

export class FindBookingDto {
  @IsString()
  @MinLength(1)
  booker: number;
}