import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BirthdayService } from '../services/birthday.service';
import { ApiTags } from '@nestjs/swagger';
import { Birthday } from '../../typeorm';

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
  createBirthday(@Body() createBirthdayDto: Birthday) {
    return this.birthdayService.createBirthday(createBirthdayDto);
  }

  @Get('find')
  findBirthdayByEmail(@Query('email') email: string) {
    return this.birthdayService.findByEmail(email);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.birthdayService.deleteById(id);
  }

  @Get('today')
  findAlertsForToday() {
    return this.birthdayService.findAlertsForToday();
  }
}
