import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserSkillDto {
  @ApiProperty({ type: Number, description: ' Skill id', required: false })
  @IsNotEmpty()
  @IsInt()
  skill: number;

  @ApiProperty({
    type: Number,
    description: ' years of experience',
    required: false,
  })
  @IsNotEmpty()
  @IsInt()
  yearsOfExperience: number;
}
