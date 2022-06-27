import { User } from '../../auth/model/auth.entity';
import { Role } from '../../auth/model/role.enum';
import { define } from 'typeorm-seeding';
import { UserDetaile } from 'src/user-detaile/model/user-detail.entity';

define(User, () => {
  const user = new User();
  user.email = 'yada@luciyan.com';
  user.username = 'yada';
  user.role = Role.ADMIN;

  user.password = '1234qwer';

  return user;
});

define(UserDetaile, (user: User): UserDetaile => {
  const userDetail = UserDetaile.create({
    user: user,
    firstName: 'admin2',
    lastName: 'dadmin',
  });

  return userDetail;
});
