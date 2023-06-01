import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
