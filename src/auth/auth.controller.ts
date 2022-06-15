import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './model/auth.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginDto } from './dto/admin-login.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google Auth',
    description:
      'Login with google auth. copy paste this link on browser then continue with your gmail account',
  })
  async googleAuth(@Req() req) {
    return {};
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect('https://lucian.netlify.app/jobs/filter/swift', 200)
  @ApiOperation({
    summary: 'Google Auth',
    description: 'this link is for google auth do not use it',
    deprecated: true,
  })
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleLogin(req, res);
  }

  @Post('signup')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'this api is not needed',
    description: 'this link is no longer needed',
    deprecated: true,
  })
  signUP(@Req() req, @Body() createUserDto: CreateUserDto) {
    console.log('r');

    return this.authService.signUp(req.user, createUserDto);
  }

  @Post('adminLogin')
  @ApiOperation({
    summary: 'Authentication for admin',
    description: 'this link is for admin login onliy,',
  })
  loginAdmin(@Body(ValidationPipe) adminLogin: AdminLoginDto) {
    return this.authService.adminLogin(adminLogin);
  }

  @Get('getUser')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Authentication test',
    description:
      'this link is for test authentication.please add token before proceding',
  })
  async test(@Req() req) {
    return await User.findOne({ id: req.user.id });
  }
}
