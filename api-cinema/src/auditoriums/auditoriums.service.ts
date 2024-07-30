import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(createAuditoriumDto:CreateAuditoriumDto) {
    return await this.auditoriumRepository.save(createAuditoriumDto);
  }

  async findAll(){
    return await this.auditoriumRepository.find();
  }

  async findOne(id:number){
    const auditorium = await this.auditoriumRepository.findOneBy({id});
    if(!auditorium)
      throw new BadRequestException('Cat not found');
    return auditorium;
  }
}