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
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  educationLevel: string;

  @Column({ type: 'timestamp' })
  from: Date;

  @Column({ type: 'timestamp' })
  to: Date;

  @Column()
  colleage: string;

  @ManyToOne((type) => User, (user) => user.education, {
    eager: false,
    nullable: false,
  })
  @JoinColumn()
  user: User;
}
