import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateJobSkillDto {
  @IsNotEmpty()
  @IsArray()
  skills: [];
}
