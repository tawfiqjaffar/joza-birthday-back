import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  exports: [MailService],
  imports: [HttpModule],
  providers: [MailService],
})
export class MailModule {}
