import { User } from 'src/auth/model/auth.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum userStatus {
  ACTIVE = 'active',
  NOTCOMPLETED = 'notCompleted',
  BLOCKED = 'blocked',
  DEACTIVATED = 'deactivated',
}

@Entity()
export class UserDetaile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  professionalSummary: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'enum', enum: userStatus, default: userStatus.NOTCOMPLETED })
  status: userStatus;

  @OneToOne((type) => User, (user) => user.userDetails, { eager: false })
  user: User;
}
