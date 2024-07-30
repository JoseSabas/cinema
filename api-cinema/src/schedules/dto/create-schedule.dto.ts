import { IsString, MinLength, IsInt, IsPositive } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @MinLength(1)
  hour: string;

  @IsInt()
  @IsPositive()
  auditorium: number;

  @IsInt()
  @IsPositive()
  movie: number;
}