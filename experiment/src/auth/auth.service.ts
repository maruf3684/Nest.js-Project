import { CustomerRepository } from './customers.repository';
import { Injectable } from '@nestjs/common';

//@Injectable()
export class AuthService {
    constructor(private readonly customerRepository:CustomerRepository){}

    
}
