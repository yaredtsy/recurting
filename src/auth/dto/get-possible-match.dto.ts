import { IsArray, IsNotEmpty } from 'class-validator';

export class GetPossibleMatchDto {
  @IsNotEmpty()
  @IsArray()
  skills: number[];
}
