import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { BookersService } from 'src/bookers/bookers.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
  
@Injectable()
export class AuthService {
  constructor(
    private readonly bookersService:BookersService,
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
    /*const a = await this.mailService.sendMail({
      from: 'Jose Sabas <josesabashdez@gmail.com>',
      to: 'joserodolfosabashernandez@gmail.com',
      subject: `How to Send Emails with Nodemailer`,
      text: `Forgot your password? If you didn't forget your password, please ignore this email!`
    });
    console.log('a -> ', a);*/
    //=========================================================

    return {token, user};
  }
}