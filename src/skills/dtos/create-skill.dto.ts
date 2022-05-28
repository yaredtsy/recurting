import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
