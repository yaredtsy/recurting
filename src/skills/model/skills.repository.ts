import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateSkillDto } from '../dtos/create-skill.dto';
import { Skill } from './skill.entity';

@EntityRepository(Skill)
export class SkillRepository extends Repository<Skill> {
  async createSKill(createSkillDto: CreateSkillDto) {
    try {
      const skill = await Skill.create({ ...createSkillDto }).save();
      return skill;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('skill alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteSkill(id: number) {
    try {
      const result: DeleteResult = await Skill.delete(id);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updateSkill(id: number, createSkillDto: CreateSkillDto) {
    try {
      await Skill.update({ id: id }, { ...createSkillDto });
      const skill = await Skill.findOne({ id: id });

      return skill;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('skill alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
