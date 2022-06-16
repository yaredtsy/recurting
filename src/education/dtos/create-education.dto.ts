import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ type: String, description: ' educationL evel ' })
  @IsNotEmpty()
  @IsString()
  educationLevel: string;

  @ApiProperty({ type: Date, description: ' education started date ' })
  @IsDateString()
  @IsNotEmpty()
  from: Date;

  @ApiProperty({ type: Date, description: ' education finished date ' })
  @IsDateString()
  @IsNotEmpty()
  to: Date;

  @ApiProperty({ type: String, description: ' educationLevel ' })
  @IsNotEmpty()
  @IsString()
  college: string;

  @ApiProperty({ type: String, description: ' Filed of Area ' })
  @IsNotEmpty()
  @IsString()
  filed: string;
}
