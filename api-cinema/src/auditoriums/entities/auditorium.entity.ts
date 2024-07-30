import { Column, Entity, OneToMany } from 'typeorm';
import { Schedule } from 'src/schedules/entities/schedule.entity';

@Entity()
export class Auditorium {
  @Column({primary:true, generated:true})
  id: number;

  @Column({nullable:false})
  name: string;

  @Column({nullable:false})
  seats: number;

  @OneToMany(() => Schedule, (schedule) => schedule.auditorium)
  schedules: Schedule[]
}