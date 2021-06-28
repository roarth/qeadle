import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateNeedleDto } from './dto/create-needle.dto';
import { GetNeedlesFilterDto } from './dto/get-needles-filter.dto';
import { Needle } from './needle.entity';
import { NeedleRepository } from './needle.repository';

@Injectable()
export class NeedlesService {
  private logger = new Logger('NeedlesService');
  constructor(
    @InjectRepository(NeedleRepository)
    private needleRepository: NeedleRepository,
  ) {}

  async getNeedles(
    filterDto: GetNeedlesFilterDto,
    @GetUser() user: User,
  ): Promise<Needle[]> {
    return this.needleRepository.getNeedles(filterDto, user);
  }

  async createNeedle(
    createNeedleDto: CreateNeedleDto,
    @GetUser() user: User,
  ): Promise<Needle> {
    return this.needleRepository.createNeedle(createNeedleDto, user);
  }
}
