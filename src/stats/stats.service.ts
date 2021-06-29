import { Injectable } from '@nestjs/common';
import { NeedlesService } from 'src/needles/needles.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class StatsService {
  constructor(
    private needleService: NeedlesService,
    private projectsService: ProjectsService,
  ) {}

  async getStats() {
    const needles = await this.needleService.getNeedlesStats();
    const projects = await this.projectsService.getProjectsStats();
    return { projects: projects, needles: needles };
  }
}
