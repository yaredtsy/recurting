import { User } from 'src/auth/model/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDetaileDto } from '../dtos/create-user-detail.dto.';
import { UserDetaile } from '../user-detail.entity';

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
      UserDetaile.update({ user: user }, createUserDetailDto);
    }

    return userdetail;
  }
}
