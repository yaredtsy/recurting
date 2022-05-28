import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserSkillRepository } from './model/user-skills.repository';
import { UserSkillsController } from './user-skills.controller';
import { UserSkillsService } from './user-skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkillRepository]), AuthModule],
  controllers: [UserSkillsController],
  providers: [UserSkillsService],
})
export class UserSkillsModule {}
