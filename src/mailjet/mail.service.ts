import { Injectable } from '@nestjs/common';
import { Birthday } from '../typeorm';
import * as moment from 'moment';
import { MailjetService } from 'nest-mailjet';

@Injectable()
export class MailService {
  constructor(private readonly mailjetService: MailjetService) {}

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

  private async sendMail(message: string) {
    return await this.mailjetService.send({
      Messages: [
        {
          From: {
            Email: 'tawfiq.jaffar@joza-it.fr',
          },
          To: [
            {
              Email: 'tawfiq.jaffar@joza-it.fr',
            },
          ],
          Subject: '[JOZA] - Anniversaires des consultants',
          TextPart: message,
        },
      ],
    });
  }
}
