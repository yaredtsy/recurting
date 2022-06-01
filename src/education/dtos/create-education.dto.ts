import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsNotEmpty()
  @IsString()
  educationLevel: string;

  @IsDateString()
  @IsNotEmpty()
  from: Date;

  @IsDateString()
  @IsNotEmpty()
  to: Date;

  @IsNotEmpty()
  @IsString()
  colleage: string;
}
