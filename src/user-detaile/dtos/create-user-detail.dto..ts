import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDetaileDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  professionalSummary: string;

  @IsPhoneNumber('ET')
  phone: string;

  @IsString()
  location: string;

  @IsString()
  city: string;
}
