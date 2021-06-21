import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { ProjectStatus } from './project-status.enum';
import { Project } from './project.entity';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
  ) {}

  async getProjects(filterDto: GetProjectsFilterDto): Promise<Project[]> {
    return this.projectRepository.getProjects(filterDto);
  }

  async getProjectById(id: string): Promise<Project> {
    const found = await this.projectRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }
    return found;
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.createProject(createProjectDto);
  }

  async deleteProject(id: string): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }
  }

  async updateProjectStatus(
    id: string,
    status: ProjectStatus,
  ): Promise<Project> {
    const project = await this.getProjectById(id);
    project.status = status;
    await project.save();
    return project;
  }
}
