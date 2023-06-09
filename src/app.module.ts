import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BirthdayModule } from './birthday/birthday.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

import entities from './typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobsService } from './cron/cron-jobs.service';
import { CronJobsModule } from './cron/cron-jobs.module';
import { MailService } from './mailjet/mail.service';
import { MailModule } from './mailjet/mail.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ScheduleModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BirthdayModule,
    MailModule,
    HttpModule,
    UsersModule,
    CronJobsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronJobsService, MailService],
})
export class AppModule {}
