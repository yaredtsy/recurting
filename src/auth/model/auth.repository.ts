import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AdminLoginDto } from '../dto/admin-login.dto';
import { use } from 'passport';
import { Role } from './role.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const user = await User.findOne({ email: createUserDto.email });

    if (!user) {
      let isRegister = false;
      let username = createUserDto.username;
      while (!isRegister) {
        try {
          const newUser = new User();
          newUser.email = createUserDto.email;
          newUser.username = username;
          newUser.password = 'None';

          isRegister = true;

          await newUser.save();
          delete newUser.password;

          return newUser;
        } catch (err) {
          if (err.code == 23505) {
            isRegister = false;
            username =
              username +
              (Math.floor(Math.random() * (1000 - 100 + 1)) + 100).toString();
            console.log(username);
          } else {
            throw new InternalServerErrorException();
          }
        }
      }
    }

    try {
      user.username = createUserDto.username;
      await user.save();
    } catch (err) {
      console.log(err);

      if (err.code === '23505') {
        throw new ConflictException('Username alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    delete user.password;
    return user;
  }

  removeRealtedFiled(user: User) {
    delete user.userDetails;
    delete user.workHistory;
    delete user.skill;
    delete user.education;

    return user;
  }

  // loginAdmin(adminLoginDto: AdminLoginDto) {}

  async signup(adminLoginDto: AdminLoginDto) {
    const user = new User();
    user.email = adminLoginDto.email;

    const salt = await bcrypt.genSalt();
    user.password = await this.hasPassword(adminLoginDto.password, salt);
    user.salt = salt;

    user.role = Role.ADMIN;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('Email alerady exists');
      else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hasPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(adminLoginDto: AdminLoginDto): Promise<string> {
    const { email, password } = adminLoginDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }
}
