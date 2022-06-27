import { IsEnum, IsNotEmpty } from 'class-validator';
import { JobStatus } from '../model/job.entity';

export class UpdateJobStatusDto {
  @IsEnum(JobStatus)
  @IsNotEmpty()
  status: JobStatus;
}
