import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/auth/model/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEducationDto } from '../dtos/create-education.dtos';
import { Education } from './education.entity';

@EntityRepository(Education)
export class EducationRepository extends Repository<Education> {
  async createEducation(user: User, createEducation: CreateEducationDto) {
    try {
      const education = await Education.create({
        user: user,
        ...createEducation,
      }).save();
      return education;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateEducation(
    user: User,
    id: number,
    updateEducation: CreateEducationDto,
  ) {
    const result = await Education.update(
      { user: user, id: id },
      { ...updateEducation },
    );

    return result;
  }

  async deleteEducation(user: User, id: number) {
    const result = await Education.delete({ user, id });
    return result;
  }
}
