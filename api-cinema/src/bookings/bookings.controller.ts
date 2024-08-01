import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from "../auth/guard/auth.guard";
import { BookingsService } from './bookings.service';
import { CreateBookingDto, FindBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService:BookingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createBookingDto:CreateBookingDto) {
    const {id, uuid} = await this.bookingsService.create(createBookingDto);
    return {id, uuid};
  }

  @Get(':uuid')
  @UseGuards(AuthGuard)
  async findOne(@Param('uuid') uuid:string) {
    const data = await this.bookingsService.findOne(uuid);
    const seats = data.seats.map(({n}) => n);

    return {uuid:data.uuid, createdDate:data.createdDate, email:data.booker.email, hour:data.schedule.hour, auditorium:data.schedule.auditorium.name, movie:{title:data.schedule.movie.title, image:data.schedule.movie.image}, seats};
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Body() findBookingDto:FindBookingDto) {
    const data = await this.bookingsService.findByBookerId(findBookingDto);
    const res = data.map(({uuid, createdDate}) => ({uuid, createdDate:createdDate.toISOString().split('T')[0].replaceAll('-', '/')}));

    return res;
  }
}