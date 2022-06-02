import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDetaileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  professionalSummary: string;

  @IsString()
  title: string;

  @IsPhoneNumber('ET')
  phone: string;

  @IsString()
  location: string;

  @IsString()
  city: string;
}
