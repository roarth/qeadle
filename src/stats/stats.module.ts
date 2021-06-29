import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { AuthModule } from 'src/auth/auth.module';
import { NeedlesModule } from 'src/needles/needles.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [AuthModule, NeedlesModule, ProjectsModule],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
