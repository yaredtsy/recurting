import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/model/auth.entity';
import { Skill } from 'src/skills/model/skill.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatWorkDetailDto } from '../dtos/create-work-history.dto';
import { UpdateWorkDetailDto } from '../dtos/update-work-history.dto';
import { WorkHistory } from './work-history.entity';

@EntityRepository(WorkHistory)
export class WorkHistoryRepository extends Repository<WorkHistory> {
  async createWorkHistory(user: User, createWorkHistory: CreatWorkDetailDto) {
    const skills = [];
    for (let i = 0; i < createWorkHistory.skill.length; i++) {
      const skill = await Skill.findOne({ id: createWorkHistory.skill[i] });
      if (!skill) throw new NotFoundException('Skill not found');
      skills.push(skill);
    }

    const workHistory = await WorkHistory.create({
      user: user,
      skills: skills,
      ...createWorkHistory,
    }).save();

    return workHistory;
  }

  async updateWorkHistory(id: number, updateWorkHistory: UpdateWorkDetailDto) {
    const skills = [];
    for (let i = 0; i < updateWorkHistory.skill.length; i++) {
      const skill = await Skill.findOne({ id: updateWorkHistory.skill[i] });
      if (!skill) throw new NotFoundException('Skill not found');
      skills.push(skill);
    }

    delete updateWorkHistory.skill;
    try {
      await WorkHistory.update({ id: id }, { ...updateWorkHistory });
      const workHistory = await WorkHistory.findOne(id);
      workHistory.skills = skills;
      workHistory.save();
      return workHistory;
    } catch (error) {
      console.log(error.message);
    }
  }

  async removeWorkHistory(id: number, user: User) {
    const workHistory = await WorkHistory.delete({ id });

    user.workHistory = user.workHistory.filter(
      (workHistory) => workHistory.id !== id,
    );
    user.save();
    return workHistory;
  }
}
