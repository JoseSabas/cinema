import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuditoriumDto } from './dto/create-auditorium.dto';
import { Auditorium } from './entities/auditorium.entity';

@Injectable()
export class AuditoriumsService {
  constructor(
    @InjectRepository(Auditorium)
    private readonly auditoriumRepository:Repository<Auditorium>
  ) {}

  async createMultiple(createAuditoriumDto:CreateAuditoriumDto[]) {
    return await this.auditoriumRepository.save(createAuditoriumDto);
  }

  async create(createAuditoriumDto:CreateAuditoriumDto) {
    return await this.auditoriumRepository.save(createAuditoriumDto);
  }
}