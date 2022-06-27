import { User } from 'src/auth/model/auth.entity';
import { Role } from 'src/auth/model/role.enum';
import { UserDetaile } from 'src/user-detaile/model/user-detail.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class UserCreateSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    // const user = await (await factory(User)().create()).save();
    // console.log(user);
    // const userDetial = await (await factory(UserDetaile)(user).create()).save();
    // user.userDetails = userDetial;
    // await user.save();
    // console.log(user);
    // const user = await User.create({
    //   email: 'yada@luciyan.com',
    //   username: 'yada',
    //   role: Role.ADMIN,
    //   password: '1234qwer',
    // }).save();
    // const userDetial = await UserDetaile.create({
    //   user: user,
    //   firstName: 'admin2',
    //   lastName: 'dadmin',
    // }).save();
    // user.userDetails = userDetial;
    // await user.save();
    // user.email = 'yada@luciyan.com';
    // user.username = 'yada';
    // user.role = Role.ADMIN;
    // user.password = '1234qwer';
  }
}
