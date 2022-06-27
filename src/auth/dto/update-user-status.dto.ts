import { IsEnum, IsNotEmpty } from 'class-validator';
import { userStatus } from '../model/role.enum';

export class UpdateUserStatusDto {
  @IsNotEmpty()
  @IsEnum(userStatus)
  status: userStatus;
}
