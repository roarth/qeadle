import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProjectsModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
