import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsString } from 'class-validator';

export class UpdateWorkDetailDto {
  @ApiProperty({
    type: Number,
    description: 'work history position',
    required: true,
  })
  @IsString()
  position: string;

  @ApiProperty({ type: Number, description: 'company name', required: true })
  @IsString()
  companyName: string;

  @ApiProperty({ type: Date, description: 'work started date', required: true })
  @IsDateString()
  from: Date;

  @ApiProperty({ type: Date, description: 'work ended', required: false })
  @IsDateString()
  to: Date;

  @ApiProperty({
    type: String,
    description: 'your role in the job',
    required: false,
  })
  @IsString()
  role: string;

  @ApiProperty({
    type: Array,
    description: 'skills used in this work ',
    required: false,
  })
  @IsArray()
  skill: number[];
}
