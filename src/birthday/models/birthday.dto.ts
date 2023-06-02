import { IsBoolean, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class BirthdayDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsBoolean()
  alertWeekBefore: boolean;

  @IsBoolean()
  alertDayBefore: boolean;

  @IsBoolean()
  alertOnTheDay: boolean;
}
