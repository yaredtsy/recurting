import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/model/auth.entity';
import { Skill } from 'src/skills/model/skills.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserSkillDto } from '../dtos/create-user-skill.dtos';
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
      // if (!skill) {
      //   throw new NotFoundException('skill doesnt exists');
      // }
      const userSkill = await UserSkill.create({
        user: user,
        skill: skill,
        yearsOfExperience: createUserSkill.yearsOfExperience,
      }).save();

      return userSkill;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('skill alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    // user.skill.push(...userskills);
    // await user.save();
  }

  async updateUserSkill(
    user: User,
    id: number,
    createUserSkill: CreateUserSkillDto,
  ) {
    const skill = await Skill.findOne({ id: createUserSkill.skill });
    try {
      const userskill = await UserSkill.update(
        { user: user, id: id },
        {
          skill: skill,
          yearsOfExperience: createUserSkill.yearsOfExperience,
        },
      );

      return userskill;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('skill alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteUserSkill(user: User, id: number) {
    const result = await UserSkill.delete({ user: user, id: id });
    return result.affected;
  }
}
