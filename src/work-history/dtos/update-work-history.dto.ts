import { IsArray, IsDateString, IsString } from 'class-validator';

export class UpdateWorkDetailDto {
  @IsString()
  position: string;

  @IsString()
  companyName: string;

  @IsDateString()
  from: Date;

  @IsDateString()
  to: Date;

  @IsString()
  role: string;

  @IsArray()
  skill: number[];
}
