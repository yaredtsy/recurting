import { IsOptional, IsString } from 'class-validator';

export class JobFilterDto {
  @IsOptional()
  @IsString()
  query: string;

  @IsOptional()
  @IsString()
  search: string;
}
