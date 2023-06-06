import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('to-create')
  findUsersWithoutBirthdays() {
    return this.usersService.findEmailsWithoutBirthdays();
  }
}
