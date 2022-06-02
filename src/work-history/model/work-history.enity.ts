import { User } from 'src/auth/model/auth.entity';
import { Skill } from 'src/skills/model/skills.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class WorkHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column()
  companyName: string;

  @Column({ type: 'timestamp' })
  from: Date;

  @Column({ type: 'timestamp' })
  to: Date;

  @Column()
  role: string;

  @ManyToOne((type) => User, (user) => user.workHistory, { eager: false })
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToMany((type) => Skill, (skill) => skill.workHistory, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  skills: Skill[];
}
