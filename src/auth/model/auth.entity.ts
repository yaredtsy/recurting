import { Education } from 'src/education/model/education.entity';
import { UserDetaile } from 'src/user-detaile/model/user-detail.entity';
import { UserSkill } from 'src/user-skills/model/user-skills.entity';
import { WorkHistory } from 'src/work-history/model/work-history.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Role, userStatus } from './role.enum';
import * as bcrypt from 'bcrypt';
import { AssignedUser } from 'src/job/model/assigned-user.entity';
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

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  salt: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => UserDetaile, (userDetaile) => userDetaile.user, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'userDetails' })
  userDetails: UserDetaile;

  @Column({ type: 'enum', enum: userStatus, default: userStatus.ACTIVE })
  status: userStatus;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany((type) => WorkHistory, (workHistory) => workHistory.user, {
    eager: true,
    nullable: true,
  })
  workHistory: WorkHistory[];

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user, {
    nullable: true,
    eager: true,
  })
  skill: UserSkill[];

  @OneToMany((type) => Education, (education) => education.user, {
    nullable: true,
    eager: true,
  })
  education: Education;

  @OneToMany((type) => AssignedUser, (assignedUsers) => assignedUsers.user)
  assignedCompany: AssignedUser[];

  @BeforeInsert()
  async setPassword(password: string) {
    this.salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(password || this.password, this.salt);
  }

  async EncryptPassword(password: string) {
    this.salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password || this.password, this.salt);
    return password;
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    const bb = bcrypt.compareSync(password, this.password);
    console.log(bb);

    console.log(this.email);

    return hash == this.password;
  }
}
