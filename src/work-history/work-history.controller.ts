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
import { ApiTags } from '@nestjs/swagger';
import { CreatWorkDetailDto } from './dtos/create-work-history.dto';
import { UpdateWorkDetailDto } from './dtos/update-work-history.dto';

import { WorkHistoryService } from './work-history.service';

@Controller('work-history')
@ApiTags('work-history')
@UseGuards(AuthGuard())
export class WorkHistoryController {
  constructor(private readonly workHistoryService: WorkHistoryService) {}

  @Get('')
  getWorkHistory(@Req() req) {
    return this.workHistoryService.getWorkHistory(req.user);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  createWorkHistory(@Req() req, @Body() createWorkHistory: CreatWorkDetailDto) {
    return this.workHistoryService.createWorkHistory(
      req.user,
      createWorkHistory,
    );
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateWorkHistory(
    @Param('id', new ParseIntPipe()) id,
    @Req() req,
    @Body() updateWorkHistory: UpdateWorkDetailDto,
  ) {
    return this.workHistoryService.updateWorkHistory(
      req.user,
      updateWorkHistory,
      id,
    );
  }

  @Delete(':id')
  deleteWorkHistory(@Param('id', new ParseIntPipe()) id, @Req() req) {
    return this.workHistoryService.deleteWorkHistory(req.user, id);
  }
}
