import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { NeedleRepository } from './needle.repository';
import { NeedlesController } from './needles.controller';
import { NeedlesService } from './needles.service';

@Module({
  imports: [TypeOrmModule.forFeature([NeedleRepository]), AuthModule],
  controllers: [NeedlesController],
  providers: [NeedlesService],
})
export class NeedlesModule {}
