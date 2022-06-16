import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 } from 'cloudinary';
import toStream from 'buffer-to-stream';
import { User } from 'src/auth/model/auth.entity';
import { CreateUserDetaileDto } from './dto/create-user-detail.dto.';
import { UpdateUserDetaileDto } from './dto/update-user-detail.dto';
import { UserDetaileRepository } from './model/user-detail.repository';

@Injectable()
export class UserDetaileService {
  constructor(
    @InjectRepository(UserDetaileRepository)
    private userDetaileRepository: UserDetaileRepository,
  ) {}

  async createUserDetaile(user: User, createUserDetaile: CreateUserDetaileDto) {
    const userdetail =
      await this.userDetaileRepository.createUserDetailRepository(
        user,
        createUserDetaile,
      );
    return userdetail;
  }

  async updateUserDetaile(user: User, updateUserDetaile: UpdateUserDetaileDto) {
    const userdetail =
      await this.userDetaileRepository.createUserDetailRepository(
        user,
        updateUserDetaile as CreateUserDetaileDto,
      );
    return userdetail;
  }

  getUserDetail(user: User) {
    return user.userDetails;
  }

  async imageUpload(user: User, file: Express.Multer.File) {
    return await this.userDetaileRepository.updateProfileImage(user, file.path);
  }
}
