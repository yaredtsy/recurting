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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserSkillDto } from './dtos/create-user-skill.dto';
import { UserSkillsService } from './user-skills.service';

@Controller('user-skills')
@ApiTags('user-skills')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class UserSkillsController {
  constructor(private userSkillsService: UserSkillsService) {}

  @Get('')
  @UseGuards(AuthGuard())
  getUserSkill(@Req() req) {
    return this.userSkillsService.getUserSkill(req.user);
  }

  @ApiOperation({
    summary: 'get job list recommend for users',
    description: 'description is good',
  })
  @UseGuards(AuthGuard())
  @Post('')
  createUserSkill(
    @Req() req,
    @Body(new ParseArrayPipe({ items: CreateUserSkillDto }))
    createUserSkillDto: CreateUserSkillDto[],
  ) {
    return this.userSkillsService.createUserSkill(req.user, createUserSkillDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
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
  @UseGuards(AuthGuard())
  @ApiParam({ name: 'id', type: Number })
  @UsePipes(ValidationPipe)
  deleteUserSkill(@Req() req, @Param('id', new ParseIntPipe()) id) {
    console.log(req.user);

    return this.userSkillsService.deleteUserSkill(req.user, id);
  }
}
