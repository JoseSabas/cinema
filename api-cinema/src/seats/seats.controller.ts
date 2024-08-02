import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from "../auth/guard/auth.guard";
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('seats')
@ApiBearerAuth()
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService:SeatsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createSeatDto:CreateSeatDto) {
    return this.seatsService.create(createSeatDto);
  }
}