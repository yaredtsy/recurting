import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatWorkDetailDto {
  @ApiProperty({
    type: Number,
    description: 'work history position',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ type: Number, description: 'company name', required: true })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ type: Date, description: 'work started date', required: true })
  @IsDateString()
  @IsNotEmpty()
  from: Date;

  @ApiProperty({ type: Date, description: 'work ended', required: false })
  @IsDateString()
  @IsNotEmpty()
  to: Date;

  @ApiProperty({
    type: String,
    description: 'your role in the job',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    type: Array,
    description: 'skills used in this work ',
    required: false,
  })
  @IsNotEmpty()
  @IsArray()
  skill: number[];
}
