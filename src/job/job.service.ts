import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';

import { User } from 'src/auth/model/auth.entity';
import { In } from 'typeorm';
import { AsiggnUsersDto } from './dtos/assign-users.dto';
import { CreateJobDto } from './dtos/create-jobs.dto';
import { JobFilterDto } from './dtos/job-filter.dto';

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

  async getJobs(query: PaginateQuery) {
    return paginate(query, this.jobRepository, {
      sortableColumns: ['created_at', 'id'],
      searchableColumns: ['jobType', 'role'],
      defaultSortBy: [['created_at', 'DESC']],
      relations: ['skills'],
      filterableColumns: {
        'skills.name': [FilterOperator.IN],
      },
    });
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

  async paginate(query: PaginateQuery) {
    const queryBuilder = Job.createQueryBuilder('job').leftJoinAndSelect(
      'job.skills',
      'skills',
    );
    return paginate(query, queryBuilder, {
      sortableColumns: ['created_at', 'id'],
      searchableColumns: ['jobType', 'role'],
      defaultSortBy: [['created_at', 'DESC']],
    });
  }

  async getUserRelatedJob(user: User, query: PaginateQuery) {
    if (user.skill.length > 0) {
      const userSkills = user.skill.map((skill) => skill.skill.id);
      const queryBuilder = Job.createQueryBuilder('job')
        .leftJoinAndSelect('job.skills', 'skill')
        .where('skill.id IN (:...skills)', { skills: userSkills })
        .orderBy('job.created_at');

      return paginate(query, queryBuilder, {
        sortableColumns: ['created_at', 'id'],
        searchableColumns: ['jobType', 'role'],
        defaultSortBy: [['created_at', 'DESC']],
      });
    }
    return [];
  }
}
