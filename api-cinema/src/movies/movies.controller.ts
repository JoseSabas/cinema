import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService:MoviesService) {}

  @Post()
  create(@Body() createMovieDto:CreateMovieDto){
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id:number) {
    const data = await this.moviesService.findOne(id);
    const auditoriums = data.schedules.map(({id, hour, auditorium}) => {
      return {scheduleId:id, scheduleHour:hour, auditoriumName:auditorium.name, auditoriumSeats:auditorium.seats};
    });
    const res = {};
    auditoriums.forEach(auditorium => {
      if(auditorium.auditoriumName in res)
        res[auditorium.auditoriumName].schedules.push({id:auditorium.scheduleId, hour:auditorium.scheduleHour});
      else
        res[auditorium.auditoriumName] = {seats:auditorium.auditoriumSeats, schedules:[{id:auditorium.scheduleId, hour:auditorium.scheduleHour}]};
    });

    return {title:data.title, description:data.description, auditoriums:res};
  }
}