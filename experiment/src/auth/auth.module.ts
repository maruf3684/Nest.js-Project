import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { Customer } from './customer.entity';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerRepository } from './customers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// import * as dotenv from 'dotenv';
// dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions:{
        expiresIn:3600
      }
    }),
    TypeOrmModule.forFeature([Customer])
  ],
  providers: [CustomerRepository, AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}

 
