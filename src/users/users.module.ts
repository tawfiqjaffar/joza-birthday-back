import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Birthday } from '../typeorm';

@Module({
  controllers: [UsersController],
  imports: [HttpModule, TypeOrmModule.forFeature([Birthday])],
  providers: [UsersService],
})
export class UsersModule {}
