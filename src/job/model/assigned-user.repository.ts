import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/model/auth.entity';
import { Role } from 'src/auth/model/role.enum';
import { EntityRepository, Repository } from 'typeorm';
import { AsiggnUsersDto } from '../dtos/assign-users.dto';
import { AssignedUser } from './assigned-user.entity';
import { Job } from './job.entity';

@EntityRepository(AssignedUser)
export class AssignedUserRepository extends Repository<AssignedUser> {
  async assignUsers(jobid: number, assignUser: AsiggnUsersDto) {
    const job = await Job.findOne({ id: jobid });
    const user = await User.findOne({ id: assignUser.user, role: Role.USER });

    if (!job) throw new BadRequestException('Job id not found');
    if (!user) throw new BadRequestException('User not found');

    try {
      const assign = await AssignedUser.create({ user, job }).save();
      return assign;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Users alredy assigned.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async removeassignUser(jobid: number, assignUser: AsiggnUsersDto) {
    const job = await Job.findOne({ id: jobid });
    const user = await User.findOne({ id: assignUser.user, role: Role.USER });
    if (!job) throw new BadRequestException('Job id not found');
    if (!user) throw new BadRequestException('User not found');

    try {
      const users = await AssignedUser.delete({ user, job });
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async changeStatus(jobid: number, assignUser: AsiggnUsersDto) {
    const job = await Job.findOne({ id: jobid });

    const user = await User.findOne({ id: assignUser.user, role: Role.USER });
    if (!job) throw new BadRequestException('Job id not found');
    if (!user) throw new BadRequestException('User not found');
    if (!assignUser.status)
      throw new BadRequestException('Stuts User not found');

    try {
      const result = await AssignedUser.update(
        { user, job },
        { status: assignUser.status },
      );
      return await AssignedUser.findOne({ user, job });
    } catch (error) {
      console.log(error);
    }
  }
}
