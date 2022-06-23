import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDetaileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  professionalSummary: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsPhoneNumber('ET')
  phone: string;

  @IsString()
  location: string;

  @IsString()
  city: string;
}
