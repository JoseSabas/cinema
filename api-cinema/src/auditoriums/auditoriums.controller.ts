import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuditoriumsService } from './auditoriums.service';
import { CreateAuditoriumDto } from './dto/create-auditorium.dto';

@Controller('auditoriums')
export class AuditoriumsController {
  constructor(private readonly auditoriumsService:AuditoriumsService) {}

  @Post()
  create(@Body() createAuditoriumDto:CreateAuditoriumDto) {
    return this.auditoriumsService.create(createAuditoriumDto);
  }

  @Get()
  findAll() {
    return this.auditoriumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:number) {
    return this.auditoriumsService.findOne(id);
  }
}