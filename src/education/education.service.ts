import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/model/auth.entity';
import { CreateEducationDto } from './dtos/create-education.dtos';
import { EducationRepository } from './model/enducation.repository';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(EducationRepository)
    private educationRepository: EducationRepository,
  ) {}

  getEducation() {}

  createEducation(user: User, createEducation: CreateEducationDto) {}

  updateEducation(
    user: User,
    id: number,
    updateEducation: CreateEducationDto,
  ) {}

  deleteEducation(user: User, id: number) {}
}
