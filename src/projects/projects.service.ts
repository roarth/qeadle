import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { ProjectStatus } from './project-status.enum';
import { Project } from './project.entity';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectsService {
  private logger = new Logger('ProjectsService');
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
  ) {}

  async getProjects(
    filterDto: GetProjectsFilterDto,
    @GetUser() user: User,
  ): Promise<Project[]> {
    return this.projectRepository.getProjects(filterDto, user);
  }

  async getProjectById(id: string): Promise<Project> {
    const found = await this.projectRepository.findOne(id);
    if (!found) {
      this.logger.verbose(`Project with id "${id}" not found`);
      throw new NotFoundException(`Project with id "${id}" not found`);
    }
    return found;
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectRepository.createProject(createProjectDto, user);
  }

  async deleteProject(id: string): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (!result.affected) {
      this.logger.verbose(`Project with id "${id}" not found`);
      throw new NotFoundException(`Project with id "${id}" not found`);
    }

    this.logger.verbose(`Project with id "${id}" successfully deleted`);
  }

  async updateProjectStatus(
    id: string,
    status: ProjectStatus,
  ): Promise<Project> {
    const project = await this.getProjectById(id);
    project.status = status;

    await project.save();
    this.logger.verbose(`Project with id "${id}" successfully updated`);
    return project;
  }
}
