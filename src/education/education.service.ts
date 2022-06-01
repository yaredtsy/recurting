import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/model/auth.entity';
import { CreateEducationDto } from './dtos/create-education.dto';
import { UpdateEducationDto } from './dtos/update-education.dto';
import { EducationRepository } from './model/enducation.repository';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(EducationRepository)
    private educationRepository: EducationRepository,
  ) {}

  async getEducation(user: User) {
    return await this.educationRepository.find({ user: user });
  }

  async createEducation(user: User, createEducation: CreateEducationDto) {
    return await this.educationRepository.createEducation(
      user,
      createEducation,
    );
  }

  async updateEducation(
    user: User,
    id: number,
    updateEducation: UpdateEducationDto,
  ) {
    return await this.educationRepository.updateEducation(
      user,
      id,
      updateEducation,
    );
  }

  async deleteEducation(user: User, id: number) {
    return await this.educationRepository.deleteEducation(user, id);
  }
}
