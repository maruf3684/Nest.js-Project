import { Customer } from './customer.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerRepository } from './customers.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    super({
      secretOrKey: config.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Customer> {
    const { email } = payload;
    const user = await this.customerRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
