import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDetaileDto } from './dtos/create-user-detail.dto.';
import { UpdateUserDetaileDto } from './dtos/update-user-detail.dto';
import { UserDetaileService } from './user-detaile.service';

@Controller('user-detaile')
@UseGuards(AuthGuard())
export class UserDetaileController {
  constructor(private readonly userdetaileService: UserDetaileService) {}

  @Get('')
  getUserDetail(@Req() req) {
    return this.userdetaileService.getUserDetail(req.user);
  }
  @Patch('')
  @UsePipes(ValidationPipe)
  updateUserDetaile(
    @Req() req,
    @Body() updateUserDetaile: UpdateUserDetaileDto,
  ) {
    return this.userdetaileService.updateUserDetaile(
      req.user,
      updateUserDetaile,
    );
  }

  @Post('')
  @UsePipes(ValidationPipe)
  createUserDetail(@Req() req, @Body() createUserDetail: CreateUserDetaileDto) {
    return this.userdetaileService.createUserDetaile(
      req.user,
      createUserDetail,
    );
  }

  @Post('upload-image')
  uploadImage() {
    // return this.userdetaileService.;
  }
}