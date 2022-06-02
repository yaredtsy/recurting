import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDetaileDto {
  @ApiProperty({ type: String, description: ' first name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ type: String, description: ' last name', required: true })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    description: ' professional summary',
    required: false,
  })
  @IsString()
  professionalSummary: string;

  @ApiProperty({
    type: String,
    description: ' user title',
    required: false,
  })
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: ' phone number', required: false })
  @IsPhoneNumber('ET')
  phone: string;

  @ApiProperty({ type: String, description: ' location', required: false })
  @IsString()
  location: string;

  @ApiProperty({ type: String, description: ' city', required: false })
  @IsString()
  city: string;
}
