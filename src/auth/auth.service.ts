import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/auth.entity';
import { UserRepository } from './model/auth.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return req.user;
    }
    const createUserDto = req.user;
    const payload: JwtPayload = { email: createUserDto.email };
    let user = await this.userRepository.findOne({
      email: 'sd',
    });

    const response = {
      isRegister: true,
      accessToken: '',
      user: {},
    };

    if (!user) {
      response.isRegister = false;
      user = await this.userRepository.createUser(createUserDto);
    }

    response.user = user;
    response.accessToken = this.jwtService.sign(payload);
    return response;
  }

  async signUp(user: User, createUserDto: CreateUserDto) {
    const newuser = await this.userRepository.createUser({
      email: user.email,
      username: createUserDto.username,
    });
    return newuser;
  }
}
