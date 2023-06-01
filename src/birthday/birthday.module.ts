import { Module } from '@nestjs/common';
import { BirthdayController } from './controllers/birthday/birthday.controller';
import { BirthdayService } from './services/birthday/birthday.service';

@Module({
  controllers: [BirthdayController],
  providers: [BirthdayService],
})
export class BirthdayModule {}
