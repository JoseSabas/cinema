import { IsInt, IsPositive } from 'class-validator';

export class CreateSeatDto {
  @IsInt()
  @IsPositive()
  n: number;

  @IsInt()
  @IsPositive()
  booking: number;
}