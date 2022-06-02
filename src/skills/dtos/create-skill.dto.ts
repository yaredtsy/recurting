import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ type: Number, description: ' name of skill', required: false })
  @IsNotEmpty()
  @IsString()
  name: string;
}
