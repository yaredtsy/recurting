import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { JobStatus, ProficiencyType } from '../model/job.entity';

export class UpdateJobDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

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
  @IsEnum(ProficiencyType)
  proficiencyType: ProficiencyType;

  @IsEnum(JobStatus)
  status: JobStatus;
}
