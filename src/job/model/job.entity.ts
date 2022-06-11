import { type } from 'os';
import { Company } from 'src/company/model/company.entity';
import { Skill } from 'src/skills/model/skill.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssignedUser } from './assigned-user.entity';

export enum ProficiencyType {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERRT = 'EXPERRT',
}

export enum JobStatus {
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED',
}
@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  jobType: string;

  @Column()
  description: string;

  @Column()
  amountOfUser: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'enum', enum: ProficiencyType })
  proficiency: ProficiencyType;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.OPEN })
  status: JobStatus;

  @OneToMany((type) => AssignedUser, (assignedUsers) => assignedUsers.job)
  assignedUsers: AssignedUser[];

  @ManyToOne((type) => Company, (company) => company.job, {
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  company: Company;

  @ManyToMany((type) => Skill, (skill) => skill.job)
  @JoinTable()
  skills: Skill[];
}
