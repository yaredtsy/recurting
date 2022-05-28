import { UserSkill } from 'src/user-skills/model/user-skills.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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
}
