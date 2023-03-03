import { IsEmail } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Task } from 'src/tasks/task.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.customer, { eager: true })
  task: Task[];

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await argon2.hash(this.password);
  // }
}
