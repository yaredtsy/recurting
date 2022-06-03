import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './model/auth.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from './get-user.decorater';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return {};
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Post('signup')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  signUP(@Req() req, @Body() createUserDto: CreateUserDto) {
    console.log('r');

    return this.authService.signUp(req.user, createUserDto);
  }

  @Get('test')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async test(@Req() req) {
    return await User.findOne({ id: req.user.id });
  }
}
