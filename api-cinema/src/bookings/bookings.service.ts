import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository:Repository<Booking>
  ) {}

  async create(createBookingDto:CreateBookingDto) {
    return await this.bookingRepository.save(createBookingDto);
  }
}