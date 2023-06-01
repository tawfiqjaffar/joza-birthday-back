import { IsBoolean, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BirthdayDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDateString()
  @ApiProperty()
  dateOfBirth: Date;

  @IsBoolean()
  @ApiProperty()
  alertWeekBefore: boolean;

  @IsBoolean()
  @ApiProperty()
  alertDayBefore: boolean;

  @IsBoolean()
  @ApiProperty()
  alertOnTheDay: boolean;
}
