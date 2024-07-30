import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Booker } from '../../bookers/entities/booker.entity';
import { Schedule } from '../../schedules/entities/schedule.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@Entity()
export class Booking {
  @Column({primary:true, generated:true})
  id: number;

  @ManyToOne(() => Booker, (booker) => booker.id, {eager:true})
  booker: Booker | number;

  @ManyToOne(() => Schedule, (schedule) => schedule.id, {eager:true})
  schedule: Schedule | number;

  @OneToMany(() => Seat, (seat) => seat.booking)
  seats: Seat[]
}