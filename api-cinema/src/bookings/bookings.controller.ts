import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from "../auth/guard/auth.guard";
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService:BookingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createBookingDto:CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }
}