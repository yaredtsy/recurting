import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobRepository } from './model/job.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository]), AuthModule],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
