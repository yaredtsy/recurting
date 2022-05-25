import { User } from 'src/auth/model/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDetaileDto } from '../dtos/create-user-detail.dto.';
import { UserDetaile } from './user-detail.entity';

@EntityRepository(UserDetaile)
export class UserDetaileRepository extends Repository<UserDetaile> {
  async createUserDetailRepository(
    user: User,
    createUserDetailDto: CreateUserDetaileDto,
  ): Promise<UserDetaile> {
    // let userdetail = await UserDetaile.findOne();

    // if (!userdetail) {
    const userdetail = UserDetaile.create({ ...createUserDetailDto });
    // } else {
    //   UserDetaile.update({ user: user }, createUserDetailDto);
    // }

    return userdetail;
  }
}
