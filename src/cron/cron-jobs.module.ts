import { Module } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { BirthdayModule } from '../birthday/birthday.module';
import { MailModule } from '../mailjet/mailjet.module';

@Module({
  imports: [BirthdayModule, MailModule],
  providers: [CronJobsService],
})
export class CronJobsModule {}
