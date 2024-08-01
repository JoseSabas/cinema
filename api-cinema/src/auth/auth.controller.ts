import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "../auth/guard/auth.guard";
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @Post('register')
  register(@Body() registerDto:RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto:LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('Seed')
  @UseGuards(AuthGuard)
  async seed() {
    return await this.authService.seed();
  }
}