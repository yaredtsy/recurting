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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create-company.dto';

@Controller('company')
@ApiTags('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('')
  getCompanys() {
    return this.companyService.getCompanys();
  }

  @Post('')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createCompany(@Body() createCompany: CreateCompanyDto) {
    return this.companyService.createCompany(createCompany);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  updateCompany(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCompany: CreateCompanyDto,
  ) {
    return this.companyService.updateCompany(id, updateCompany);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  deleteCompany(@Param('id', new ParseIntPipe()) id: number) {
    return this.companyService.deleteCompany(id);
  }
}
