import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/model/auth.entity';
import { CreateUserSkillDto } from './dtos/create-user-skill.dto';
import { UserSkillRepository } from './model/user-skills.repository';

@Injectable()
export class UserSkillsService {
  constructor(
    @InjectRepository(UserSkillRepository)
    private userSkillRepository: UserSkillRepository,
  ) {}

  async getUserSkill(user: User) {
    return await this.userSkillRepository.getUserSKill(user);
  }

  async createUserSkill(user: User, createUserSkills: CreateUserSkillDto[]) {
    const userSkills = [];

    for (let i = 0; i < createUserSkills.length; i++) {
      const userSkill = await this.userSkillRepository.createUserSkill(
        user,
        createUserSkills[i],
      );
      if (userSkill) userSkills.push(userSkill);
    }

    return userSkills;
  }

  async updateUserSKill(
    user: User,
    id: number,
    createUserSkill: CreateUserSkillDto,
  ) {
    return await this.userSkillRepository.updateUserSkill(
      user,
      id,
      createUserSkill,
    );
  }

  async deleteUserSkill(user: User, id: number) {
    return await this.userSkillRepository.deleteUserSkill(user, id);
  }
}
