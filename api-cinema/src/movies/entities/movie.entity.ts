import { Column, Entity, OneToMany } from 'typeorm';
import { Schedule } from 'src/schedules/entities/schedule.entity';

@Entity()
export class Movie {
  @Column({primary:true, generated:true})
  id: number;

  @Column({nullable:false})
  title: string;

  @Column({nullable:false})
  description: string;

  @Column({nullable:false})
  image: string;

  @OneToMany(() => Schedule, (schedule) => schedule.movie)
  schedules: Schedule[]
}