import { Company } from 'src/company/model/company.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  companyName: string;

  @Column()
  role: string;

  @Column()
  jobType: string;

  @Column()
  description: string;

  @Column()
  amountOfUser: number;

  @Column({ type: 'enum', enum: ProficiencyType })
  proficiency: ProficiencyType;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.OPEN })
  status: JobStatus;

  @ManyToOne((type) => Company, (company) => company.job)
  @JoinColumn()
  company: Company;
}
