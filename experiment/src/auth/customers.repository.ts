import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
export class CustomerRepository extends Repository<Customer> {
    constructor(
      @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    ) {
      super(
        customerRepository.target,
        customerRepository.manager,
        customerRepository.queryRunner,
      );
    }


}