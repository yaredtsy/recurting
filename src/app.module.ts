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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

console.log(process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV == 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...typeOrmConfig,
      }),
    }),
    AuthModule,
    UserDetaileModule,
    WorkHistoryModule,
    SkillsModule,
    UserSkillsModule,
    EducationModule,
    JobModule,
    CompanyModule,
    DatabaseModule,
  ],
})
export class AppModule {}
