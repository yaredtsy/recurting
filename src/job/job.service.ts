import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobDto } from './dtos/create-jobs.dto';

import { UpdateJobDto } from './dtos/update-job.dto';
import { JobRepository } from './model/job.repository';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobRepository) private jobRepository: JobRepository,
  ) {}

  async getJobs() {
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
}
