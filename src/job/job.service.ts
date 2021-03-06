import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';

import { User } from 'src/auth/model/auth.entity';
import { In } from 'typeorm';
import { AsiggnUsersDto } from './dtos/assign-users.dto';
import { CreateJobDto } from './dtos/create-jobs.dto';
import { JobFilterDto } from './dtos/job-filter.dto';
import { UpdateJobSkillDto } from './dtos/update-job-skill.dto';
import { UpdateJobStatusDto } from './dtos/update-job-status.dto';

import { UpdateJobDto } from './dtos/update-job.dto';
import { AssignedUser } from './model/assigned-user.entity';
import { AssignedUserStatus } from './model/assigned-user.enum';
import { AssignedUserRepository } from './model/assigned-user.repository';
import { Job, JobStatus } from './model/job.entity';
import { JobRepository } from './model/job.repository';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobRepository) private jobRepository: JobRepository,
    @InjectRepository(AssignedUserRepository)
    private assignUserRepository: AssignedUserRepository,
  ) {}
  async getGeneralInfo() {
    const interviewing = await Job.createQueryBuilder('job')
      .leftJoinAndSelect('job.assignedUsers', 'assignedUsers')
      .where('assignedUsers.status = :status', {
        status: AssignedUserStatus.INTERVIEWING,
      })
      .getCount();

    const open = await Job.createQueryBuilder('job')
      .where('job.status = :status', {
        status: JobStatus.OPEN,
      })
      .getCount();
    const closed = await Job.createQueryBuilder('job')
      .where('job.status = :status', {
        status: JobStatus.CLOSED,
      })
      .getCount();

    return { interviewing: interviewing, closed: closed, open: open };
  }
  async getJobs(query: PaginateQuery) {
    const queryBuilder = Job.createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('job.assignedUsers', 'assignedUsers')
      .leftJoinAndSelect('assignedUsers.user', 'user')
      .leftJoinAndSelect('user.userDetails', 'userDetails')
      .loadRelationCountAndMap('job.candidates', 'job.assignedUsers');

    return paginate(query, queryBuilder, {
      sortableColumns: ['created_at', 'id'],
      searchableColumns: ['jobType', 'role', 'description'],
      defaultSortBy: [['created_at', 'DESC']],
      relations: ['skills', 'company', 'assignedUsers'],
      filterableColumns: {
        'skills.id': [FilterOperator.IN],
        'assignedUsers.status': [FilterOperator.IN],
        'assignedUsers.user.id': [FilterOperator.IN],

        'company.id': [FilterOperator.IN],
        status: [FilterOperator.IN],
      },
    });
  }

  async updateJobStatus(id: number, status: UpdateJobStatusDto) {
    const job = await Job.update({ id: id }, { status: status.status });
    return await this.getJob(id);
  }

  async getJob(id: number): Promise<Job> {
    return await Job.createQueryBuilder('job')
      .where('job.id = :id', {
        id: id,
      })
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('job.skills', 'skills')
      .loadRelationCountAndMap('job.candidates', 'job.assignedUsers')
      .leftJoinAndSelect('job.assignedUsers', 'assignedUsers')
      .leftJoinAndSelect('assignedUsers.user', 'user')
      .getOne();
  }

  async createJobs(createUserDto: CreateJobDto) {
    const job = this.jobRepository.createJob(createUserDto);
    return this.getJob((await job).id);
  }

  async updateJob(id: number, updateJobDto: UpdateJobDto) {
    return await this.jobRepository.updateJob(id, updateJobDto);
  }
  async deleteJobs(id: number) {
    return await this.jobRepository.deleteJob(id);
  }

  async assignUser(jobId: number, assignUser: AsiggnUsersDto) {
    const job = await this.assignUserRepository.assignUsers(jobId, assignUser);
    return await this.getJob(job.id);
  }

  async deleteAssignUser(jobId: number, userid: number) {
    const job = await this.assignUserRepository.removeassignUser(jobId, userid);
    return await this.getJob(job.id);
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

      const id = await Job.createQueryBuilder('job')
        .leftJoinAndSelect('job.skills', 'skill')
        .where('skill.id IN (:...skills)', { skills: userSkills })
        .orderBy('job.created_at')
        .cache(10000)
        .select('job.id')
        .getMany();
      const jobsId = id.map((jobs) => jobs.id);

      if (jobsId.length > 0) {
        const queryBuilder = Job.createQueryBuilder('job')
          .leftJoinAndSelect('job.skills', 'skill')
          .where('job.id IN (:...ids)', { ids: jobsId });

        return paginate(query, queryBuilder, {
          sortableColumns: ['created_at', 'id'],
          searchableColumns: ['description', 'role'],
          defaultSortBy: [['created_at', 'DESC']],
          relations: ['skills', 'assignedUsers'],
          filterableColumns: {
            status: [FilterOperator.IN],
            'assignedUsers.status': [FilterOperator.IN],
            'skills.name': [FilterOperator.IN],
          },
        });
      } else {
        return {
          data: [],
          meta: null,
          links: null,
        };
      }
    } else {
      return {
        data: [],
        meta: null,
        links: null,
      };
    }
  }

  async addSKill(id: number, updateJobSkill: UpdateJobSkillDto) {
    await this.jobRepository.addSkills(id, updateJobSkill);
    return await this.getJob(id);
  }
}
