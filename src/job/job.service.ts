import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/model/auth.entity';
import { AsiggnUsersDto } from './dtos/assign-users.dto';
import { CreateJobDto } from './dtos/create-jobs.dto';

import { UpdateJobDto } from './dtos/update-job.dto';
import { AssignedUser } from './model/assigned-user.entity';
import { AssignedUserRepository } from './model/assigned-user.repository';
import { Job } from './model/job.entity';
import { JobRepository } from './model/job.repository';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobRepository) private jobRepository: JobRepository,
    @InjectRepository(AssignedUserRepository)
    private assignUserRepository: AssignedUserRepository,
  ) {}

  async getJobs(user: User | null) {
    if (user) {
      console.log('loged in successfully');
    }
    return await this.jobRepository.getJob();
  }

  async createJobs(createUserDto: CreateJobDto) {
    return await this.jobRepository.createJob(createUserDto);
  }
  async updateJob(id: number, updateJobDto: UpdateJobDto) {
    return await this.jobRepository.updateJob(id, updateJobDto);
  }
  async deleteJobs(id: number) {
    return await this.jobRepository.deleteJob(id);
  }

  async assignUser(jobId: number, assignUser: AsiggnUsersDto) {
    return await this.assignUserRepository.assignUsers(jobId, assignUser);
  }

  async deleteAssignUser(jobId: number, assignUser: AsiggnUsersDto) {
    return await this.assignUserRepository.removeassignUser(jobId, assignUser);
  }

  async updateassignUser(jobId: number, assignUser: AsiggnUsersDto) {
    return await this.assignUserRepository.changeStatus(jobId, assignUser);
  }

  async getAssignedUser(jobId: number) {
    return this.jobRepository.getUserWithCandidate(jobId);
  }
}
