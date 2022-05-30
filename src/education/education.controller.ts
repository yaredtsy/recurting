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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateEducationDto } from './dtos/create-education.dtos';
import { EducationService } from './education.service';

@Controller('education')
@UseGuards(AuthGuard)
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Get('')
  getEducation() {}

  @Post('')
  creatEducation(@Req() req, @Body() createEducation: CreateEducationDto) {}

  @Patch(':id')
  updateEducation(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body() updateEducation: CreateEducationDto,
  ) {}

  @Delete(':id')
  deleteEducation(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body() deleteEducation: CreateEducationDto,
  ) {}
}
