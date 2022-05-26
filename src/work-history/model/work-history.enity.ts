import { User } from 'src/auth/model/auth.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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
}
