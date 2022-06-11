import { User } from '../../auth/model/auth.entity';
import { Role } from '../../auth/model/role.enum';
import { define } from 'typeorm-seeding';

define(User, () => {
  const user = new User();
  user.email = 'user@example.com';
  user.username = 'admin';
  user.role = Role.ADMIN;

  user.password = '1234qwer';

  return user;
});
