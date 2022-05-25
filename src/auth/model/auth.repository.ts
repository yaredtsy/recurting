import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';
import { CreateUserDto } from '../dto/create-user.dto';

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

          return newUser;
        } catch (err) {
          console.log(err);

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

    return user;
  }
}
