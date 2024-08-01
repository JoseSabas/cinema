import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository:Repository<Schedule>
  ) {}

  async createMultiple(createScheduleDto:CreateScheduleDto[]) {
    return await this.scheduleRepository.save(createScheduleDto);
  }

  async create(createScheduleDto:CreateScheduleDto) {
    return await this.scheduleRepository.save(createScheduleDto);
  }

  async findOne(id:number) {
    return await this.scheduleRepository.findOne({where:{id}, relations:["bookings", "bookings.seats"]});
  }
}