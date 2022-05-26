import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { WorkHistoryRepository } from './model/work-history.repository';
import { WorkHistoryController } from './work-history.controller';
import { WorkHistoryService } from './work-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkHistoryRepository]), AuthModule],
  controllers: [WorkHistoryController],
  providers: [WorkHistoryService],
})
export class WorkHistoryModule {}
