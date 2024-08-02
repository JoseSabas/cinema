import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from "../auth/guard/auth.guard";
import { AuditoriumsService } from './auditoriums.service';
import { CreateAuditoriumDto } from './dto/create-auditorium.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auditoriums')
@ApiBearerAuth()
@Controller('auditoriums')
export class AuditoriumsController {
  constructor(private readonly auditoriumsService:AuditoriumsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAuditoriumDto:CreateAuditoriumDto) {
    return this.auditoriumsService.create(createAuditoriumDto);
  }
}