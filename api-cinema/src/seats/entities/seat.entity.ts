import { Column, Entity, ManyToOne } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class Seat {
  @Column({primary:true, generated:true})
  id: number;

  @Column({nullable:false})
  n: number;

  @ManyToOne(() => Booking, (booking) => booking.id, {eager:true})
  booking: Booking | number;
}