import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Auditorium } from '../../auditoriums/entities/auditorium.entity';
import { Movie } from '../../movies/entities/movie.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Entity()
export class Schedule {
  @Column({primary:true, generated:true})
  id: number;

  @Column({nullable:false})
  hour: string;

  @ManyToOne(() => Auditorium, (auditorium) => auditorium.id, {eager:true})
  auditorium: any;

  @ManyToOne(() => Movie, (movie) => movie.id, {eager:true})
  movie: Movie | number;

  @OneToMany(() => Booking, (booking) => booking.schedule)
  bookings: Booking[]
}