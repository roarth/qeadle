import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ProjectsService } from 'src/projects/projects.service';
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
    private projectsService: ProjectsService,
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
    const { project } = createNeedleDto;
    const p = await this.projectsService.getProjectById(project);
    return this.needleRepository.createNeedle(createNeedleDto, user, p);
  }

  async getNeedlesStats() {
    return this.needleRepository.getNeedlesStats();
  }
}
