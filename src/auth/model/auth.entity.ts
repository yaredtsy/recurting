import { Education } from 'src/education/model/education.entity';
import { UserDetaile } from 'src/user-detaile/model/user-detail.entity';
import { UserSkill } from 'src/user-skills/model/user-skills.entity';
import { WorkHistory } from 'src/work-history/model/work-history.enity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => UserDetaile, (userDetaile) => userDetaile.user, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'userDetails' })
  userDetails: UserDetaile;

  @OneToMany((type) => WorkHistory, (workHistory) => workHistory.user, {
    eager: true,
    nullable: true,
  })
  workHistory: WorkHistory[];

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  skill: UserSkill[];

  // @OneToMany((type) => Education, (education) => education.colleage)
  // education: Education;
}
