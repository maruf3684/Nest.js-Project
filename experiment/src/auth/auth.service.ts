import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CustomerRepository } from './customers.repository';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.customerRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, email, password } = authCredentialsDto;
    const user = await this.customerRepository.findOne({
      where: { email: email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email: email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
