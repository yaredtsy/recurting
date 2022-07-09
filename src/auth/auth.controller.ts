import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Roles } from './decorator/role.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './model/role.enum';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { GetPossibleMatchDto } from './dto/get-possible-match.dto';

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

  @Post('create-user')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'this api is not needed',
    description: 'this link is no longer needed',
    deprecated: true,
  })
  signUP(@Req() req, @Body() createUserDto: CreateUserDto) {
    return this.authService.createAdmin(createUserDto);
  }

  @Patch('update-user/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'this api is not needed',
    description: 'this link is no longer needed',
    deprecated: true,
  })
  updateUser(
    @Req() req,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.authService.updateUser(id, createUserDto);
  }

  @Post('adminLogin')
  @ApiOperation({
    summary: 'Authentication for admin',
    description: 'this link is for admin login onliy,',
  })
  loginAdmin(@Body(ValidationPipe) adminLogin: AdminLoginDto) {
    return this.authService.adminLogin(adminLogin);
  }

  @Get('users')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @ApiOperation({
    summary: 'Get All User list',
    description: 'this link will get you all the users list.',
  })
  async getUsersList(@Paginate() query: PaginateQuery) {
    return this.authService.getUsersList(query);
  }

  @Get('admins')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @ApiOperation({
    summary: 'Get All admin user list',
    description: 'this link will get you all the admin list.',
  })
  async getAdminUserList(@Paginate() query: PaginateQuery) {
    return this.authService.getAdminUserList(query);
  }

  @Get('users/:id')
  @ApiBearerAuth()
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({
    summary: 'Get All User list',
    description: 'this linl will get you all the users list.',
  })
  async getSelectUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.authService.getSelectedUser(id);
  }

  @Post('possible-match')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  async getPossibleMatch(
    @Paginate() query: PaginateQuery,
    @Body(ValidationPipe) getPossibleMatch: GetPossibleMatchDto,
  ) {
    return this.authService.getPossibleMatch(query, getPossibleMatch);
  }

  @Patch('update-user-status/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'update user status',
    description: 'admins can update user status ',
  })
  async updateUserStatus(
    @Param('id', new ParseIntPipe()) id,
    @Body() updateUserStatus: UpdateUserStatusDto,
  ) {
    return this.authService.updateUserStatus(id, updateUserStatus);
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
    return this.authService.getUser(req.user);
  }
}
