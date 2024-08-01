import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditoriumsService } from './auditoriums.service';
import { AuditoriumsController } from './auditoriums.controller';
import { Auditorium } from './entities/auditorium.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auditorium])],
  controllers: [AuditoriumsController],
  providers: [AuditoriumsService],
  exports: [AuditoriumsService]
})
export class AuditoriumsModule {}
