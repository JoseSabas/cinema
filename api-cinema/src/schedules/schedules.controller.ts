import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService:SchedulesService) {}

  @Post()
  create(@Body() createScheduleDto:CreateScheduleDto){
    return this.schedulesService.create(createScheduleDto);
  }

  @Get(':id')
  async findOne(@Param('id') id:number) {
    const data = await this.schedulesService.findOne(id);
    const seats_n = [];
    data.bookings.forEach(({seats}) => {
      seats.forEach(({n}) => {
        seats_n.push(n);
      });
    });
    return {seats:seats_n};
  }
}