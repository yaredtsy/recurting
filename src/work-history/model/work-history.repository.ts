import { User } from 'src/auth/model/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatWorkDetailDto } from '../dtos/create-work-history.dto';
import { UpdateWorkDetailDto } from '../dtos/update-work-history.dto';
import { WorkHistory } from './work-history.enity';

@EntityRepository(WorkHistory)
export class WorkHistoryRepository extends Repository<WorkHistory> {
  async createWorkHistory(user: User, createWorkHistory: CreatWorkDetailDto) {
    const workHistory = await WorkHistory.create({
      user: user,
      ...createWorkHistory,
    }).save();
    user.workHistory.push(workHistory);
    return workHistory;
  }

  async updateWorkHistory(id: number, updateWorkHistory: UpdateWorkDetailDto) {
    await WorkHistory.update({ id: id }, { ...updateWorkHistory });
    return await WorkHistory.findOne(id);
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
