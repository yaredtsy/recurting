import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { EducationRepository } from './model/enducation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EducationRepository]), AuthModule],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
