import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSkillDto } from './dtos/create-skill.dto';
import { SkillsService } from './skills.service';

@Controller('skills')
@ApiTags('Skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('')
  getSKills() {
    return this.skillsService.getSkills();
  }

  @Post('')
  @UsePipes(ValidationPipe)
  createSkill(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.createSKill(createSkillDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateSkill(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createSkillDto: CreateSkillDto,
  ) {
    return this.skillsService.updateSkill(id, createSkillDto);
  }

  @Delete(':id')
  deleteSkill(@Param('id') id) {
    return this.skillsService.deleteSkill(id);
  }
}
