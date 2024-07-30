import { IsString, MinLength, IsInt, IsPositive } from 'class-validator';

export class CreateAuditoriumDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsInt()
  @IsPositive()
  seats: number;
}