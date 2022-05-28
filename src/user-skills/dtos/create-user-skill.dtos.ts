import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserSkillDto {
  @IsNotEmpty()
  @IsInt()
  skill: number;

  @IsNotEmpty()
  @IsInt()
  yearsOfExperience: number;
}
