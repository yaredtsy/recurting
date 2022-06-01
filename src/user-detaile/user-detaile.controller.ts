import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CreateUserDetaileDto } from './dto/create-user-detail.dto.';
import { UpdateUserDetaileDto } from './dto/update-user-detail.dto';
import { CloudinarystorageProvider } from './providers/cloudinary.provider';
import { UserDetaileService } from './user-detaile.service';
@ApiExtraModels(CreateUserDetaileDto)
@ApiTags('User Detaile')
@Controller('user-detaile')
@UseGuards(AuthGuard())
export class UserDetaileController {
  constructor(private readonly userdetaileService: UserDetaileService) {}

  @Get('')
  getUserDetail(@Req() req) {
    return this.userdetaileService.getUserDetail(req.user);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  createUserDetail(
    @Req() req,
    @Body() createUserDetailDto: CreateUserDetaileDto,
  ) {
    return this.userdetaileService.createUserDetaile(
      req.user,
      createUserDetailDto,
    );
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

  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: CloudinarystorageProvider,
    }),
  )
  uploadImage(@Req() req, @UploadedFile() file: Express.Multer.File) {
    return this.userdetaileService.imageUpload(req.user, file);
  }
}
