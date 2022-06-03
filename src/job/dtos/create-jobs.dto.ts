import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { JobStatus, ProficiencyType } from '../model/job.entity';

export class CreateJobDto {
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amountOfUser: number;

  @IsNotEmpty()
  @IsString()
  jobType: string;

  @IsNotEmpty()
  @IsEnum(ProficiencyType)
  proficiencyType: ProficiencyType;
}
