import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { ComapanyRepository } from './model/company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(ComapanyRepository)
    private companyRepository: ComapanyRepository,
  ) {}

  async getCompanys() {
    return await this.companyRepository.find({});
  }

  async createCompany(createCompanyDto: CreateCompanyDto) {
    return await this.companyRepository.createCompany(createCompanyDto);
  }

  async updateCompany(id: number, updateCompanyDto: CreateCompanyDto) {
    return await this.companyRepository.updateCompany(id, updateCompanyDto);
  }

  async deleteCompany(id: number) {
    return await this.companyRepository.deleteCompany(id);
  }
}
