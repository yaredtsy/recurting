import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserDetaileModule } from './user-detaile/user-detaile.module';
import { WorkHistoryModule } from './work-history/work-history.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserDetaileModule,
    WorkHistoryModule,
  ],
})
export class AppModule {}
