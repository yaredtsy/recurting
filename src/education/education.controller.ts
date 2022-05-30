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
  getEducation(@Req() req) {
    return this.educationService.getEducation(req.user);
  }

  @Post('')
  creatEducation(@Req() req, @Body() createEducation: CreateEducationDto) {
    return this.educationService.createEducation(req.user, createEducation);
  }

  @Patch(':id')
  updateEducation(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body() updateEducation: CreateEducationDto,
  ) {
    return this.educationService.updateEducation(req.user, id, updateEducation);
  }

  @Delete(':id')
  deleteEducation(@Req() req, @Param('id', new ParseIntPipe()) id) {
    return this.educationService.deleteEducation(req.user, id);
  }
}
