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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/model/role.enum';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create-company.dto';

@Controller('company')
@ApiTags('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  getCompanys(@Paginate() query: PaginateQuery) {
    return this.companyService.getCompanys(query);
  }

  @Post('')
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  createCompany(@Body() createCompany: CreateCompanyDto) {
    return this.companyService.createCompany(createCompany);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UsePipes(ValidationPipe)
  updateCompany(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCompany: CreateCompanyDto,
  ) {
    return this.companyService.updateCompany(id, updateCompany);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UsePipes(ValidationPipe)
  deleteCompany(@Param('id', new ParseIntPipe()) id: number) {
    return this.companyService.deleteCompany(id);
  }
}
