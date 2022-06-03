import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/model/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEducationDto } from '../dtos/create-education.dto';
import { UpdateEducationDto } from '../dtos/update-education.dto';
import { Education } from './education.entity';

@EntityRepository(Education)
export class EducationRepository extends Repository<Education> {
  async createEducation(user: User, createEducation: CreateEducationDto) {
    console.log(createEducation);

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
    updateEducation: UpdateEducationDto,
  ) {
    const result = await Education.update(
      { user: user, id: id },
      { ...updateEducation },
    );
    if (result.affected == 0)
      throw new NotFoundException('Education not found');
    return await Education.findOne(id);
  }

  async deleteEducation(user: User, id: number) {
    const result = await Education.delete({ user, id });
    if (result.affected == 0)
      throw new NotFoundException('Education not found');
    return result;
  }
}
