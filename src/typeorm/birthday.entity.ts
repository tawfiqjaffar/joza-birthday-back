import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class Birthday {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({
    nullable: false,
    type: 'timestamp',
    name: 'date_of_birth',
  })
  @IsDateString()
  dateOfBirth: Date;

  @Column({
    type: 'boolean',
    name: 'alert_week_before',
    default: false,
  })
  @IsBoolean()
  alertWeekBefore: boolean;

  @Column({
    type: 'boolean',
    name: 'alert_day_before',
    default: false,
  })
  @IsBoolean()
  alertDayBefore: boolean;

  @Column({
    type: 'boolean',
    name: 'alert_on_the_day',
    default: true,
  })
  @IsBoolean()
  alertOnTheDay: boolean;

  @Column({
    type: 'text',
    name: 'full_name',
    default: '',
  })
  @IsNotEmpty()
  fullName: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
