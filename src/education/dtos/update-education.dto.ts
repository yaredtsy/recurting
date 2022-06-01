import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEducationDto {
  @IsString()
  @IsOptional()
  educationLevel: string;

  @IsOptional()
  @IsDateString()
  from: Date;

  @IsOptional()
  @IsDateString()
  to: Date;

  @IsOptional()
  @IsString()
  colleage: string;
}
