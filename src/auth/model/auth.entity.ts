import { UserDetaile } from 'src/user-detaile/user-detail.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => UserDetaile, (userDetaile) => userDetaile.user, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'userDetails' })
  userDetails: UserDetaile;
}
