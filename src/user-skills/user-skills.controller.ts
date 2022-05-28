import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserSkillDto } from './dtos/create-user-skill.dtos';
import { UserSkillsService } from './user-skills.service';

@Controller('user-skills')
@UseGuards(AuthGuard())
export class UserSkillsController {
  constructor(private userSkillsService: UserSkillsService) {}

  @Get('')
  getUserSkill(@Req() req) {
    return this.userSkillsService.getUserSkill(req.user);
  }

  @Post('')
  // @UsePipes(ParseArrayPipe)
  createUserSkill(
    @Req() req,
    @Body(new ParseArrayPipe({ items: CreateUserSkillDto }))
    createUserSkillDto: CreateUserSkillDto[],
  ) {
    return this.userSkillsService.createUserSkill(req.user, createUserSkillDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateUserSKill(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body() createUserSkillDto: CreateUserSkillDto,
  ) {
    return this.userSkillsService.updateUserSKill(
      req.user,
      id,
      createUserSkillDto,
    );
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  deleteUserSkill(@Req() req, @Param('id', new ParseIntPipe()) id) {
    return this.deleteUserSkill(req.user, id);
  }
}
