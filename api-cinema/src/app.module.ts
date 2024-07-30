import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuditoriumsModule } from './auditoriums/auditoriums.module';
import { BookersModule } from './bookers/bookers.module';
import { MoviesModule } from './movies/movies.module';
import { SchedulesModule } from './schedules/schedules.module';
import { BookingsModule } from './bookings/bookings.module';
import { SeatsModule } from './seats/seats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_cinema',
      password: 'root',
      database: 'cinema',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    AuditoriumsModule,
    BookersModule,
    MoviesModule,
    SchedulesModule,
    BookingsModule,
    SeatsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}