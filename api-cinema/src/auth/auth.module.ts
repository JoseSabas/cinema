import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BookersModule } from "src/bookers/bookers.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/jwt.constant";

@Module({
  imports: [
    BookersModule,
    JwtModule.register({global:true, secret:jwtConstants.secret, signOptions:{expiresIn:"1d"}})
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
