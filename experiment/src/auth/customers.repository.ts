import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt'

export class CustomerRepository extends Repository<Customer> {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {
    super(
      customerRepository.target,
      customerRepository.manager,
      customerRepository.queryRunner,
    );
  }

  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { username, email, password } = authCredentialsDto;
    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = this.create({ username:username,email:email,password:hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Usernme already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
