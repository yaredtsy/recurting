import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ComapanyRepository } from './model/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ComapanyRepository]), AuthModule],

  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
