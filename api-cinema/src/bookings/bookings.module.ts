import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { BookersModule } from 'src/bookers/bookers.module';
import { SchedulesModule } from 'src/schedules/schedules.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), BookersModule, SchedulesModule],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}