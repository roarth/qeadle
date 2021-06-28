import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { NeedlesModule } from './needles/needles.module';

@Module({
  imports: [
    ProjectsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    NeedlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
