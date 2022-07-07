import { User } from 'src/auth/model/auth.entity';
import { Skill } from 'src/skills/model/skill.entity';
import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['user', 'skill'])
export class UserSkill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  yearsOfExperience: number;

  @ManyToOne(() => Skill, (skill) => skill.userSkill, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  skill: Skill;

  @ManyToOne(() => User, (user) => user.skill)
  @JoinColumn()
  user: User;

  @Column({ nullable: false })
  proficiency: string;

  @Column({ nullable: true, insert: false, select: true, update: false })
  name: string;
}
