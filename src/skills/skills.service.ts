import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSkillDto } from './dtos/create-skill.dto';
import { SkillRepository } from './model/skills.repository';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillRepository)
    private skillRepository: SkillRepository,
  ) {}

  async getSkills() {
    const t = await this.skillRepository
      .createQueryBuilder('skill')
      .loadRelationCountAndMap('skill.job', 'skill.job')
      .getMany();

    return await this.skillRepository.find({});
  }

  async createSKill(createSkill: CreateSkillDto) {
    return await this.skillRepository.createSKill(createSkill);
  }

  async updateSkill(id: number, updateSkill: CreateSkillDto) {
    return await this.skillRepository.updateSkill(id, updateSkill);
  }

  async deleteSkill(id: number) {
    return await this.skillRepository.deleteSkill(id);
  }
}
