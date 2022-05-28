import { UserSkill } from 'src/user-skills/model/user-skills.entity';
import { WorkHistory } from 'src/work-history/model/work-history.enity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => UserSkill, (userSkill) => userSkill.skill)
  @JoinColumn()
  userSkill: UserSkill[];

  @ManyToMany(() => WorkHistory, (workeHistory) => workeHistory.skills)
  workHistory: WorkHistory[];
}
