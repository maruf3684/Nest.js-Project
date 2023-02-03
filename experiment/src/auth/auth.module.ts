import { Customer } from './customer.entity';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerRepository } from './customers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerRepository, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
