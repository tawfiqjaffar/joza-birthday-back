import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BirthdayService } from '../services/birthday.service';
import { ApiTags } from '@nestjs/swagger';
import { BirthdayDto } from '../models/birthday.dto';

@ApiTags('birthdays')
@Controller('birthdays')
export class BirthdayController {
  constructor(private readonly birthdayService: BirthdayService) {}

  @Get()
  getBirthdays() {
    return this.birthdayService.findAllBirthdays();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBirthday(@Body() createBirthdayDto: BirthdayDto) {
    return this.birthdayService.createBirthday(createBirthdayDto);
  }

  @Get('find')
  findBirthdayByEmail(@Query('email') email: string) {
    return this.birthdayService.findByEmail(email);
  }
}
