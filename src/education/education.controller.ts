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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateEducationDto } from './dtos/create-education.dto';
import { UpdateEducationDto } from './dtos/update-education.dto';
import { EducationService } from './education.service';

@Controller('education')
@ApiTags('education')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Get('')
  getEducation(@Req() req) {
    return this.educationService.getEducation(req.user);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  creatEducation(@Req() req, @Body() createEducation: CreateEducationDto) {
    console.log(createEducation);

    return this.educationService.createEducation(req.user, createEducation);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', type: Number })
  updateEducation(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body() updateEducation: UpdateEducationDto,
  ) {
    return this.educationService.updateEducation(req.user, id, updateEducation);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  deleteEducation(@Req() req, @Param('id', new ParseIntPipe()) id) {
    return this.educationService.deleteEducation(req.user, id);
  }
}
