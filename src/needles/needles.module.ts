import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { NeedleRepository } from './needle.repository';
import { NeedlesController } from './needles.controller';
import { NeedlesService } from './needles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NeedleRepository]),
    AuthModule,
    ProjectsModule,
  ],
  controllers: [NeedlesController],
  providers: [NeedlesService],
  exports: [NeedlesService],
})
export class NeedlesModule {}
