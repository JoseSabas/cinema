import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeatDto } from './dto/create-seat.dto';
import { Seat } from './entities/seat.entity';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository:Repository<Seat>
  ) {}

  async create(createSeatDto:CreateSeatDto) {
    return await this.seatRepository.save(createSeatDto);
  }
}