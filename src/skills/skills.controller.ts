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
import { ApiParam, ApiTags } from '@nestjs/swagger';
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
  @ApiParam({ name: 'id', type: Number })
  updateSkill(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createSkillDto: CreateSkillDto,
  ) {
    return this.skillsService.updateSkill(id, createSkillDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  deleteSkill(@Param('id') id) {
    return this.skillsService.deleteSkill(id);
  }
}
