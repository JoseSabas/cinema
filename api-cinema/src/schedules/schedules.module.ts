import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { Schedule } from './entities/schedule.entity';
import { AuditoriumsModule } from 'src/auditoriums/auditoriums.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), AuditoriumsModule, MoviesModule],
  controllers: [SchedulesController],
  providers: [SchedulesService]
})
export class SchedulesModule {}
