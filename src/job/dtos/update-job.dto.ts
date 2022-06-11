import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { JobStatus, ProficiencyType } from '../model/job.entity';

export class UpdateJobDto {
  @IsOptional()
  @IsNumber()
  companyId: number;

  @IsOptional()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  amountOfUser: number;

  @IsOptional()
  @IsEnum(ProficiencyType)
  proficiencyType: ProficiencyType;

  @IsOptional()
  @IsEnum(JobStatus)
  status: JobStatus;

  @IsOptional()
  @IsArray()
  skills: [];
}
