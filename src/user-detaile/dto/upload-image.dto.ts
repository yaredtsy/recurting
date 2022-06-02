import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMimeType } from 'class-validator';

export class UploadImageDto {
  @ApiProperty({ type: Number, description: ' Skill id', required: false })
  @IsNotEmpty()
  @IsMimeType()
  image: any;
}
