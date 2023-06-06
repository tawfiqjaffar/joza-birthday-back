import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Birthday } from '../typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Birthday)
    private readonly birthdayRepository: Repository<Birthday>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get('http://localhost:8085/google-workspace/users?pageLimit=100')
          .pipe(map((el) => el.data.content.users)),
      );
      console.log(response);
      return response.map((gwu) => {
        const user: User = {
          primaryEmail: gwu.primaryEmail,
          name: gwu.name,
        };
        return user;
      });
    } catch (e: any) {
      console.error(e);
      throw new HttpException(
        'Fetching Google Worskspace users failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
        e,
      );
    }
  }

  async findEmailsWithoutBirthdays() {
    const birthdays = await this.birthdayRepository.find();
    const users = await this.findAll();
    const emails = birthdays.map((b) => b.email);
    return users.filter(
      (user) => !emails.some((email) => user.primaryEmail === email),
    );
  }
}
