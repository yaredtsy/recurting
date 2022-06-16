import { User } from 'src/auth/model/auth.entity';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateUserDetaileDto } from '../dto/create-user-detail.dto.';
import { UserDetaile } from './user-detail.entity';

@EntityRepository(UserDetaile)
export class UserDetaileRepository extends Repository<UserDetaile> {
  async createUserDetailRepository(
    user: User,
    createUserDetailDto: CreateUserDetaileDto,
  ): Promise<UserDetaile> {
    let userdetail = await UserDetaile.findOne({ user: user });

    if (!userdetail) {
      userdetail = await UserDetaile.create({
        user: user,
        ...createUserDetailDto,
      }).save();
      user.userDetails = userdetail;
      user.save();
    } else {
      await UserDetaile.update({ user: user }, createUserDetailDto);
      return await UserDetaile.findOne({ user: user });
    }

    return userdetail;
  }

  async updateProfileImage(user: User, path: string) {
    const userdetail: UpdateResult = await UserDetaile.update(
      { user: user },
      { image: path },
    );
    // if (userdetail.affected > 0)
    return await UserDetaile.findOne({ user: user });
  }
}
