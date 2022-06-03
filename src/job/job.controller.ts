import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
import { CreateJobDto } from './dtos/create-jobs.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JobService } from './job.service';

@Controller('job')
@ApiTags('Jobs')
export class JobController {
  constructor(private jobsService: JobService) {}
  @Get('')
  getJobs() {
    return this.jobsService.getJobs();
  }

  @Post('')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  createJobs(@Body() createJobs: CreateJobDto) {
    return this.jobsService.createJobs(createJobs);
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
