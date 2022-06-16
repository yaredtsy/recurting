import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEducationDto {
  @ApiProperty({ type: String, description: ' educationL evel ' })
  @IsString()
  @IsOptional()
  educationLevel: string;

  @ApiProperty({ type: Date, description: ' education started date ' })
  @IsOptional()
  @IsDateString()
  from: Date;

  @ApiProperty({ type: Date, description: ' education finished date ' })
  @IsOptional()
  @IsDateString()
  to: Date;

  @ApiProperty({ type: String, description: ' educationLevel ' })
  @IsOptional()
  @IsString()
  college: string;

  @ApiProperty({ type: String, description: ' Filed of Area ' })
  @IsOptional()
  @IsString()
  filed: string;
}
