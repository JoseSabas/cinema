import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookerDto } from './dto/create-booker.dto';
import { Booker } from './entities/booker.entity';

@Injectable()
export class BookersService {
  constructor(
    @InjectRepository(Booker)
    private readonly bookerRepository:Repository<Booker>,
  ) {}

  create(createBookerDto:CreateBookerDto){
    return this.bookerRepository.save(createBookerDto);
  }

  findOneByEmail(email:string){
    return this.bookerRepository.findOneBy({email});
  }

  findByEmailWithPassword(email:string){
    return this.bookerRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password']
    });
  }
}