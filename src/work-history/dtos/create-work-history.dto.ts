import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatWorkDetailDto {
  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsDateString()
  @IsNotEmpty()
  from: Date;

  @IsDateString()
  @IsNotEmpty()
  to: Date;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @IsArray()
  skill: number[];
}
