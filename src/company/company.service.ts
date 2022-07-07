import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { ComapanyRepository } from './model/company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(ComapanyRepository)
    private companyRepository: ComapanyRepository,
  ) {}

  async getCompanys(query: PaginateQuery) {
    const queryBuilder = this.companyRepository
      .createQueryBuilder('company')
      .loadRelationCountAndMap('company.job', 'company.job');
    return paginate(query, queryBuilder, {
      sortableColumns: ['created_at'],
    });
  }

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const company = await this.companyRepository.createCompany(
      createCompanyDto,
    );
    return await this.getCompany(company.id);
  }

  async updateCompany(id: number, updateCompanyDto: CreateCompanyDto) {
    const company = await this.companyRepository.updateCompany(
      id,
      updateCompanyDto,
    );
    return await this.getCompany(company.id);
  }

  async deleteCompany(id: number) {
    return await this.companyRepository.deleteCompany(id);
  }
  async getCompany(id: number) {
    const queryBuilder = this.companyRepository
      .createQueryBuilder('company')
      .where('company.id = :id', {
        id: id,
      })
      .loadRelationCountAndMap('company.job', 'company.job');
    return await queryBuilder.getOne();
  }
}
