import { User } from 'src/auth/model/auth.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AssignedUserStatus } from './assigned-user.enum';
import { Job, JobStatus } from './job.entity';

@Entity()
@Unique(['job', 'user'])
export class AssignedUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Job, (job) => job.assignedUsers, { onDelete: 'CASCADE' })
  @JoinColumn()
  job: Job;

  @ManyToOne((type) => User, (user) => user.assignedCompany, { eager: true })
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: AssignedUserStatus,
    default: AssignedUserStatus.SHORTLIST,
  })
  status: AssignedUserStatus;
}
