import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/model/auth.entity';
import { CreatWorkDetailDto } from './dtos/create-work-history.dto';
import { UpdateWorkDetailDto } from './dtos/update-work-history.dto';
import { WorkHistoryRepository } from './model/work-history.repository';

@Injectable()
export class WorkHistoryService {
  constructor(
    @InjectRepository(WorkHistoryRepository)
    private workHistoryRepository: WorkHistoryRepository,
  ) {}

  async getWorkHistory(user: User) {
    return user.workHistory;
  }

  async createWorkHistory(user: User, createWorkHistory: CreatWorkDetailDto) {
    const workHistory = await this.workHistoryRepository.createWorkHistory(
      user,
      createWorkHistory,
    );
    return workHistory;
  }

  async updateWorkHistory(
    user: User,
    updateWorkHistory: UpdateWorkDetailDto,
    id: number,
  ) {
    const workHistory = await this.workHistoryRepository.updateWorkHistory(
      id,
      updateWorkHistory,
    );
    return workHistory;
  }

  async deleteWorkHistory(user: User, id: number) {
    const work = await this.workHistoryRepository.removeWorkHistory(id, user);
    return work;
  }
}
