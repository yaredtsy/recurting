import { Module } from '@nestjs/common';
import { UserDetaileController } from './user-detaile.controller';
import { UserDetaileService } from './user-detaile.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { UserDetaileRepository } from './model/user-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetaileRepository]), AuthModule],
  controllers: [UserDetaileController],
  providers: [UserDetaileService],
})
export class UserDetaileModule {}
