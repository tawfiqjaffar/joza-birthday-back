import { Module } from '@nestjs/common';
import { BirthdayController } from './controllers/birthday.controller';
import { BirthdayService } from './services/birthday.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Birthday } from '../typeorm';

@Module({
  controllers: [BirthdayController],
  providers: [BirthdayService],
  imports: [TypeOrmModule.forFeature([Birthday])],
})
export class BirthdayModule {}
