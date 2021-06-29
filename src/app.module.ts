import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { NeedlesModule } from './needles/needles.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ProjectsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    NeedlesModule,
    StatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
