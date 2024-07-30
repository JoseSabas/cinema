import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository:Repository<Movie>
  ) {}

  async create(createMovieDto:CreateMovieDto) {
    return await this.movieRepository.save(createMovieDto);
  }

  async findAll() {
    return await this.movieRepository.find();
  }

  async findOne(id:number) {
    return await this.movieRepository.findOne({where:{id}, relations:["schedules"]});
  }
}