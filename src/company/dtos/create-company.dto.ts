import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ type: String, description: ' Company name ' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: ' Comapany email ' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
