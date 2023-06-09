import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BirthdayService } from '../birthday/services/birthday.service';
import { MailService } from '../mailjet/mail.service';

@Injectable()
export class CronJobsService {
  private readonly logger = new Logger(CronJobsService.name);

  private exectuted = 0;

  constructor(
    private readonly birthdayService: BirthdayService,
    private readonly mailjetService: MailService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'sendAlerts' })
  async sendAlerts() {
    const birthdaysToday = await this.birthdayService.findAlertsForToday();
    const birthdaysTomorrow =
      await this.birthdayService.findAlertsForTomorrow();

    const birthdaysNextWeek =
      await this.birthdayService.findAlertsForNextWeek();

    if (
      birthdaysToday.length === 0 &&
      birthdaysTomorrow.length === 0 &&
      birthdaysNextWeek.length === 0
    ) {
      return;
    }
    const mailMessage = await this.mailjetService.writeMailMessage(
      birthdaysToday,
      birthdaysTomorrow,
      birthdaysNextWeek,
    );

    console.log(mailMessage);
    this.exectuted += 1;
  }
}
