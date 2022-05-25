import { IsNotEmpty, IsMimeType } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  @IsMimeType()
  image: any;
}
