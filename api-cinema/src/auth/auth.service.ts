import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BookersService } from 'src/bookers/bookers.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
  
@Injectable()
export class AuthService {
  constructor(private readonly bookersService:BookersService, private readonly jwtService:JwtService) {}

  async register({name, email, password}:RegisterDto){
    const user = await this.bookersService.findOneByEmail(email);

    if(user)
      throw new BadRequestException('User already exists');

    await this.bookersService.create({name, email, password:await bcryptjs.hash(password, 10)});

    const payload = {email};
    const token = await this.jwtService.signAsync(payload);

    return {token, name};
  }

  async login({email, password}:LoginDto){
    const booker = await this.bookersService.findByEmailWithPassword(email);
    if(!booker)
      throw new UnauthorizedException('email is wrong');

    const isPasswordValid = await bcryptjs.compare(password, booker.password);
    if(!isPasswordValid)
      throw new UnauthorizedException('password is wrong');

    const payload = {email};
    const token = await this.jwtService.signAsync(payload);

    return {token, name:booker.name};
  }
}