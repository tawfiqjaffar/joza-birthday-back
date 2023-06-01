import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  email: string;

  @Column({
    nullable: false,
    type: 'timestamp',
    name: 'date_of_birth',
  })
  dateOfBirth: Date;

  @Column({
    type: 'boolean',
    name: 'alert_week_before',
    default: false,
  })
  alertWeekBefore: boolean;

  @Column({
    type: 'boolean',
    name: 'alert_day_before',
    default: false,
  })
  alertDayBefore: boolean;

  @Column({
    type: 'boolean',
    name: 'alert_on_the_day',
    default: true,
  })
  alertOnTheDay: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
