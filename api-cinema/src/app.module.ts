import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuditoriumsModule } from './auditoriums/auditoriums.module';
import { BookersModule } from './bookers/bookers.module';
import { MoviesModule } from './movies/movies.module';
import { SchedulesModule } from './schedules/schedules.module';
import { BookingsModule } from './bookings/bookings.module';
import { SeatsModule } from './seats/seats.module';
import { ConfigModule } from '@nestjs/config';  //Para poder leer Variables de entorno
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),  //Para poder leer Variables de entorno
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),  //Simplemente es para convertir de cadena a entero (el puerto debe ser entero, y en variables de entorno solo se guardan cadenas)
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      }
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