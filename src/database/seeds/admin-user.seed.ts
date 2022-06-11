import { User } from 'src/auth/model/auth.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class UserCreateSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(User)().create();
  }
}
