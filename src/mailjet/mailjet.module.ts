import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailjetModule } from 'nest-mailjet';

@Module({
  imports: [MailjetModule],
  exports: [MailService],
  providers: [MailService],
})
export class MailModule {}
