import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Birthday } from '../../typeorm';
import { Repository } from 'typeorm';
import { BirthdayDto } from '../models/birthday.dto';
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

  findBy;

  async createBirthday(createBirthdayDto: BirthdayDto) {
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
}
