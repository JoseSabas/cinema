import { Column, Entity, OneToMany } from "typeorm";
import { Booking } from 'src/bookings/entities/booking.entity';

@Entity()
export class Booker {
  @Column({primary:true, generated:true})
  id: number;

  @Column({nullable:false})
  name: string;

  @Column({unique:true, nullable:false})
  email: string;

  @Column({nullable:false})
  password: string;

  @OneToMany(() => Booking, (booking) => booking.booker)
  bookings: Booking[]
}