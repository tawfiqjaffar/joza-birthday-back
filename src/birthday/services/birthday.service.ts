import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Birthday } from '../../typeorm';
import { Repository } from 'typeorm';
import { Precondition } from '../../common/precondition';

@Injectable()
export class BirthdayService {
  constructor(
    @InjectRepository(Birthday)
    private readonly birthdayRepository: Repository<Birthday>,
  ) {}

  findAllBirthdays() {
    return this.birthdayRepository.find();
  }

  async createBirthday(createBirthdayDto: Birthday) {
    const birthdayOptional = await this.birthdayRepository.findOne({
      where: {
        email: createBirthdayDto.email,
      },
    });
    Precondition.filterErrors(
      birthdayOptional === null,
      'Birthday already exists for given user',
      HttpStatus.CONFLICT,
    );

    const newBirthday = this.birthdayRepository.create(createBirthdayDto);
    return this.birthdayRepository.save(newBirthday);
  }

  async findByEmail(email: string) {
    const birthdayOptional = await this.birthdayRepository.findOne({
      where: {
        email,
      },
    });
    Precondition.filterErrors(
      birthdayOptional !== null,
      "Birthday hasn't been created for given user",
      HttpStatus.NOT_FOUND,
    );
    return birthdayOptional;
  }

  async deleteById(id: number) {
    const birthdayOptional = await this.birthdayRepository.findOne({
      where: { id },
    });
    Precondition.filterErrors(
      birthdayOptional !== null,
      "Birthday hasn't been found for given id",
      HttpStatus.NOT_FOUND,
    );
    return this.birthdayRepository.remove(birthdayOptional);
  }

  async findAlertsForToday() {
    const connection = this.birthdayRepository.manager;

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    const query = connection
      .createQueryBuilder()
      .select('birthday')
      .from(Birthday, 'birthday')
      .where(`extract(month from birthday.date_of_birth) = :month`, { month })
      .andWhere(`extract(day from birthday.date_of_birth) = :day`, { day })
      .andWhere(`alert_on_the_day = true`);

    return await query.getMany();
  }

  async findAlertsForTomorrow() {
    const connection = this.birthdayRepository.manager;

    const today = new Date();
    const day = today.getDate() + 1;
    const month = today.getMonth() + 1;

    const query = connection
      .createQueryBuilder()
      .select('birthday')
      .from(Birthday, 'birthday')
      .where(`extract(month from birthday.date_of_birth) = :month`, { month })
      .andWhere(`extract(day from birthday.date_of_birth) = :day`, { day })
      .andWhere(`alert_day_before = true`);

    return await query.getMany();
  }

  async findAlertsForNextWeek() {
    const connection = this.birthdayRepository.manager;

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const day = nextWeek.getDate();
    const month = nextWeek.getMonth() + 1;

    const query = connection
      .createQueryBuilder()
      .select('birthday')
      .from(Birthday, 'birthday')
      .where(`extract(month from birthday.date_of_birth) = :month`, { month })
      .andWhere(`extract(day from birthday.date_of_birth) = :day`, { day })
      .andWhere(`alert_week_before = true`);

    return await query.getMany();
  }
}
