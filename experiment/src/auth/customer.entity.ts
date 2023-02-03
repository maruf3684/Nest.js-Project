import { IsEmail } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as argon2 from 'argon2';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
