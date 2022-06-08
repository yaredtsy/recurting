import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { AssignedUserStatus } from '../model/assigned-user.enum';

export class AsiggnUsersDto {
  @ApiProperty({ type: String, description: ' user id ' })
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @ApiProperty({ type: String, description: ' status of user in job ' })
  @IsEnum(AssignedUserStatus)
  status: AssignedUserStatus;
}
