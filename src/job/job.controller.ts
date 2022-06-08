import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/model/role.enum';
import { AsiggnUsersDto } from './dtos/assign-users.dto';
import { CreateJobDto } from './dtos/create-jobs.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JobService } from './job.service';

@Controller('job')
@ApiTags('Jobs')
export class JobController {
  constructor(private jobsService: JobService) {}
  @Get('')
  getJobs(@Req() req) {
    return this.jobsService.getJobs(req.user);
  }

  @Post('')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  createJobs(@Body() createJobs: CreateJobDto) {
    return this.jobsService.createJobs(createJobs);
  }

  @Get(':id/assign-user')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  getUser(@Param('id', new ParseIntPipe()) id) {
    return this.jobsService.getAssignedUser(id);
  }

  @Post(':id/assign-user')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  assignUser(
    @Param('id', new ParseIntPipe()) id,
    @Body() assignUser: AsiggnUsersDto,
  ) {
    return this.jobsService.assignUser(id, assignUser);
  }

  @Delete(':id/assign-user')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  deleteAssignedUser(
    @Param('id', new ParseIntPipe()) id,
    @Body() assignUser: AsiggnUsersDto,
  ) {
    return this.jobsService.deleteAssignUser(id, assignUser);
  }

  @Patch(':id/assign-user')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  updateAssignedUser(
    @Param('id', new ParseIntPipe()) id,
    @Body() assignUser: AsiggnUsersDto,
  ) {
    return this.jobsService.updateassignUser(id, assignUser);
  }

  @Patch('')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', type: Number })
  updateJob(
    @Param('id', new ParseIntPipe()) id,
    @Body() updateJobs: UpdateJobDto,
  ) {
    return this.updateJob(id, updateJobs);
  }

  @Delete('')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'summary goes here',
    description: 'description is good',
  })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(AuthGuard())
  deleteJobs(@Param('id', new ParseIntPipe()) id) {
    return this.jobsService.deleteJobs(id);
  }
}
