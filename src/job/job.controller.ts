import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/model/role.enum';
import { AsiggnUsersDto } from './dtos/assign-users.dto';
import { CreateJobDto } from './dtos/create-jobs.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JobService } from './job.service';
import { JobFilterDto } from './dtos/job-filter.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('job')
@ApiTags('Jobs')
export class JobController {
  constructor(private jobsService: JobService) {}

  @Get('')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'sortBy', type: [String], required: false })
  @ApiQuery({ name: 'searchBy', type: [String], required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  getJobs(@Query('limit') limit: number, @Paginate() query: PaginateQuery) {
    return this.jobsService.getJobs(query);
  }

  // @Get('related')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @UsePipes(ValidationPipe)
  // getUserRealtedJob(
  //   @Query('page', new ParseIntPipe()) page: number,
  //   @Query('limit', new ParseIntPipe()) limit: number,
  //   @Query() jobFilterDto: JobFilterDto,
  // ) {}

  @Get('related')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.USER)
  getUserRelatedJob(@Req() req, @Paginate() query: PaginateQuery) {
    return this.jobsService.getUserRelatedJob(req.user, query);
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
