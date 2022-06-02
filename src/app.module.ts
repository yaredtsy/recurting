import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserDetaileModule } from './user-detaile/user-detaile.module';
import { WorkHistoryModule } from './work-history/work-history.module';
import { SkillsModule } from './skills/skills.module';
import { UserSkillsModule } from './user-skills/user-skills.module';
import { EducationModule } from './education/education.module';
import { JobModule } from './job/job.module';
import { CompanyModule } from './company/company.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserDetaileModule,
    WorkHistoryModule,
    SkillsModule,
    UserSkillsModule,
    EducationModule,
    JobModule,
    CompanyModule,
  ],
})
export class AppModule {}
