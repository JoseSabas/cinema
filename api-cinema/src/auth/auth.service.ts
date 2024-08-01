import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { BookersService } from 'src/bookers/bookers.service';
import { MoviesService } from 'src/movies/movies.service';
import { AuditoriumsService } from 'src/auditoriums/auditoriums.service';
import { SchedulesService } from 'src/schedules/schedules.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
  
@Injectable()
export class AuthService {
  constructor(
    private readonly bookersService:BookersService,
    private readonly moviesService:MoviesService,
    private readonly auditoriumsService:AuditoriumsService,
    private readonly schedulesService:SchedulesService,
    private readonly jwtService:JwtService,
    private readonly mailService:MailerService
  ) {}

  async register({name, email, password}:RegisterDto){
    const user = await this.bookersService.findOneByEmail(email);

    if(user)
      throw new BadRequestException('User already exists');

    const {id} = await this.bookersService.create({name, email, password:await bcryptjs.hash(password, 10)});

    const userData = {name, id};
    const token = await this.jwtService.signAsync(userData);

    return {token, user:userData};
  }

  async login({email, password}:LoginDto){
    const booker = await this.bookersService.findByEmailWithPassword(email);
    if(!booker)
      throw new UnauthorizedException('email is wrong');

    const isPasswordValid = await bcryptjs.compare(password, booker.password);
    if(!isPasswordValid)
      throw new UnauthorizedException('password is wrong');

    const user = {name:booker.name, id:booker.id};
    const token = await this.jwtService.signAsync(user);

    //=========================================================
    //=========================================================

    return {token, user};
  }

  async seed(){
    const movies = await this.moviesService.createMultiple([
      { 
        "title": "Deadpool & Wolverine",
        "description": "Un apático Wade Wilson se esfuerza por adaptarse a la vida civil. Sus días como el mercenario moralmente flexible, Deadpool, han quedado atrás.",
        "image": "https://statics.cinemex.com/movie_posters/8gKwoN7jSnXbvUs-360x540.jpg"
      },
      { 
        "title": "Intensamente 2",
        "description": "La película de Disney y Pixar INTENSA-MENTE 2 vuelve a sumergirse en la mente de la flamante adolescente Riley justo cuando el cuartel general...",
        "image": "https://statics.cinemex.com/movie_posters/4d00aH6R6GnwUpF-360x540.jpg"
      },
      { 
        "title": "Mi Villano Favorito 4",
        "description": "Gru, el supervillano favorito del mundo que ahora es agente de la Liga Anti-Villanos, regresa para una nueva y emocionante era de caos de los...",
        "image": "https://statics.cinemex.com/movie_posters/upJ4U0K7XJXPH65-360x540.jpg"
      },
      { 
        "title": "Tornados",
        "description": "Edgar-Jones interpreta a Kate Cooper, una antigua cazadora de tormentas atormentada por un encuentro devastador con un tornado durante sus años...",
        "image": "https://statics.cinemex.com/movie_posters/oBQ832MTePvrW4d-360x540.jpg"
      },
      { 
        "title": "Borderlands",
        "description": "Lilith (Cate Blanchett), una vil caza recompensas regresa de mala gana a Pandora, el planeta más caótico en la galaxia. Su misión es encontrar a...",
        "image": "https://statics.cinemex.com/movie_posters/2Urmz71nhtL8BTS-360x540.jpg"
      }
    ]);
    const movieIds = movies.map(({id}) => id);
    const auditoriums = await this.auditoriumsService.createMultiple([
      { "name":"Sala A", "seats":20 },
      { "name":"Sala B", "seats":20 },
      { "name":"Sala C", "seats":30 }
    ]);
    const auditoriumIds = auditoriums.map(({id}) => id);
    const hours = ['15:00', '17:00', '19:00'];

    const schedules = [];
    movieIds.forEach(movie => {
      auditoriumIds.forEach(auditorium => {
        hours.forEach(hour => {
          schedules.push({movie, auditorium, hour});
        });
      });
    });
    await this.schedulesService.createMultiple(schedules);

    return 'OK';
  }
}