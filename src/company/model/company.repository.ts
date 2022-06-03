import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { Company } from './company.entity';

@EntityRepository(Company)
export class ComapanyRepository extends Repository<Company> {
  async createCompany(createCompanyDto: CreateCompanyDto) {
    try {
      const company = await Company.create({ ...createCompanyDto }).save();
      return company;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('skill alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateCompany(id: number, updateCompanyDto: CreateCompanyDto) {
    let result;
    try {
      result = await Company.update({ id: id }, { ...updateCompanyDto });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('company alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    if (result.affected == 0) throw new NotFoundException('company not found');
    return Company.findOne(id);
  }

  async deleteCompany(id: number) {
    const result = await Company.delete({ id });
    if (result.affected == 0) throw new NotFoundException('company delete');

    return result;
  }
}
