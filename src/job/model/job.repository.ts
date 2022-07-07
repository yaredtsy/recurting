import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Company } from 'src/company/model/company.entity';
import { Skill } from 'src/skills/model/skill.entity';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateJobDto } from '../dtos/create-jobs.dto';
import { UpdateJobSkillDto } from '../dtos/update-job-skill.dto';
import { UpdateJobDto } from '../dtos/update-job.dto';
import { Job, JobStatus } from './job.entity';

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
  async getJob() {
    return await Job.find();
  }
  async createJob(createJob: CreateJobDto) {
    const company = await Company.findOne({ id: createJob.companyId });
    const skills = [];
    if (createJob.skills)
      for (let i = 0; i < createJob.skills.length; i++) {
        const skill = await Skill.findOne({ id: createJob.skills[i] });
        if (!skill) throw new NotFoundException('Skill not found');
        skills.push(skill);
      }

    if (!company) throw new NotFoundException('Company not found');

    try {
      const job = Job.create({
        company: company,
        proficiency: createJob.proficiencyType,
        status: JobStatus.OPEN,
        skills: skills,
        ...createJob,
      });
      job.skills = skills;
      await job.save();
      return job;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async updateJob(id: number, updateJob: UpdateJobDto) {
    const company = await Company.findOne({ id: updateJob.companyId });
    const skills = [];
    if (updateJob.skills)
      for (let i = 0; i < updateJob.skills.length; i++) {
        const skill = await Skill.findOne({ id: updateJob.skills[i] });
        if (!skill) throw new NotFoundException('Skill not found');
        skills.push(skill);
      }

    if (!company) throw new NotFoundException('Company not found');
    let result: UpdateResult;

    delete updateJob.skills;
    delete updateJob.companyId;

    if (skills.length == 0)
      result = await Job.update({ id: id }, { company: company, ...updateJob });
    else
      result = await Job.update(
        { id: id },
        { skills: skills, company: company, ...updateJob },
      );
    if (result.affected == 0) throw new NotFoundException('job not found');
    return await Job.findOne(id);
  }
  async deleteJob(id: number) {
    const result = await Job.delete({ id });
    if (result.affected == 0) throw new NotFoundException('company delete');

    return result;
  }

  async getUserWithCandidate(jobId: number) {
    const job = await Job.createQueryBuilder('job')
      .leftJoinAndSelect('job.assignedUsers', 'assignedUser')
      .leftJoinAndSelect(
        'assignedUser.user',
        'user',
        'assignedUser.userId = user.id',
      )
      .where('job.id = :jobId', { jobId })
      .getOne();
    return job;
  }

  async addSkills(id: number, updateJobSkill: UpdateJobSkillDto) {
    const skills = [];
    if (updateJobSkill.skills)
      for (let i = 0; i < updateJobSkill.skills.length; i++) {
        const skill = await Skill.findOne({ id: updateJobSkill.skills[i] });
        if (!skill) throw new NotFoundException('Skill not found');
        skills.push(skill);
      }

    const job = await Job.findOne({ id: id });
    job.skills = skills;
    await job.save();
    return id;
  }
}
