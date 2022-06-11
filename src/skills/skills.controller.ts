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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/model/role.enum';
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
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @UsePipes(ValidationPipe)
  createSkill(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.createSKill(createSkillDto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', type: Number })
  updateSkill(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createSkillDto: CreateSkillDto,
  ) {
    return this.skillsService.updateSkill(id, createSkillDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiParam({ name: 'id', type: Number })
  deleteSkill(@Param('id') id) {
    return this.skillsService.deleteSkill(id);
  }
}
