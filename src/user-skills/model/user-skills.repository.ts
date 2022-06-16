import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/model/auth.entity';
import { Skill } from 'src/skills/model/skill.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserSkillDto } from '../dtos/create-user-skill.dto';
import { UserSkill } from './user-skills.entity';

@EntityRepository(UserSkill)
export class UserSkillRepository extends Repository<UserSkill> {
  async getUserSKill(user: User) {
    return await UserSkill.find({
      where: { user: user },
      join: {
        alias: 'userSkill',
        leftJoinAndSelect: { name: 'userSkill.skill' },
      },
    });
  }

  async createUserSkill(user: User, createUserSkill: CreateUserSkillDto) {
    try {
      const skill = await Skill.findOne({ id: createUserSkill.skill });

      const userSkill = await UserSkill.create({
        user: user,
        skill: skill,
        yearsOfExperience: createUserSkill.yearsOfExperience,
        proficiency: createUserSkill.proficiency,
      }).save();

      return userSkill;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('skill alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUserSkill(
    user: User,
    id: number,
    createUserSkill: CreateUserSkillDto,
  ) {
    const skill = await Skill.findOne({ id: createUserSkill.skill });
    if (!skill) throw new NotFoundException(' skill not found');
    try {
      const result = await UserSkill.update(
        { user: user, id: id },
        {
          skill: skill,
          yearsOfExperience: createUserSkill.yearsOfExperience,
          proficiency: createUserSkill.proficiency,
        },
      );

      if (result.affected == 0)
        throw new NotFoundException('user skill not founs');

      return await UserSkill.findOne(id);
    } catch (err) {
      console.log(err);

      if (err.status == '404') {
        throw new NotFoundException('user skill not founs');
      }
      if (err.code === '23505') {
        throw new ConflictException('skill alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteUserSkill(user: User, id: number) {
    console.log(user);

    const result = await UserSkill.delete({ user: user, id: id });
    return result.affected;
  }
}
