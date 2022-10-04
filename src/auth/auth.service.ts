import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const user = await this.createUser(authCredentialsDto);
    const payload = {
      id: user.id,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async signIn({
    email,
    password,
  }: AuthCredentialsDto): Promise<JwtPayloadDto> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        id: user.id,
      };
      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const newUser = this.userRepository.create({
        ...authCredentialsDto,
        password: hashedPassword,
      });

      return this.userRepository.save(newUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
