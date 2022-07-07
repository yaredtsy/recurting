import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { UserSkill } from './user-skills.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserSkill> {
  listenTo() {
    return UserSkill;
  }

  async afterLoad(user: UserSkill): Promise<void> {
    const skills = await UserSkill.findOne(user.id, { relations: ['skill'] });
    console.log(skills);

    user.name = 'lo';
  }
}
