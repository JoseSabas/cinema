import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booker } from "./entities/booker.entity";
import { BookersService } from './bookers.service';
import { BookersController } from './bookers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Booker])],
  controllers: [BookersController],
  providers: [BookersService],
  exports: [BookersService]
})
export class BookersModule {}