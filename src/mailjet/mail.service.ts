import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Birthday } from '../typeorm';
import * as moment from 'moment';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MailService {
  constructor(private readonly httpService: HttpService) {}

  async writeMailMessage(
    birthdaysToday: Birthday[],
    birthdaysTomorrow: Birthday[],
    birthdaysNextWeek: Birthday[],
  ) {
    const formatBirthdays = (birthdays: Birthday[]) => {
      let result = '';
      birthdays.forEach((b, index) => {
        const formattedDateOfBirth = moment(
          b.dateOfBirth,
          'YYYY-MM-DDTHH:mm:ss.SSSZ',
        ).format('DD-MM-YYYY');
        if (index !== 0) {
          result += ', ';
        }
        result += `${b.fullName} (${formattedDateOfBirth})`;
      });
      return result;
    };

    const message = `  Bonjour,
    Les anniversaires du jour : ${formatBirthdays(birthdaysToday)}.
    Les anniversaires demain : ${formatBirthdays(birthdaysTomorrow)}.
    Les anniversaires la semaine prochaine : ${formatBirthdays(
      birthdaysNextWeek,
    )}.`;
    await this.sendMail(message);
    return message;
  }

  async sendMail(message: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${process.env.JOZA_UD_API_URL}/mail/send-mail`, {
          message,
          destination: 'tawfiq.jaffar+1@joza-it.fr',
          subject: "[JOZA] - Alertes d'anniversaire",
        }),
      );
      return response;
    } catch (e: any) {
      throw new HttpException(
        'Sending mail failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
        e,
      );
    }
  }
}
