import { Injectable } from '@nestjs/common';
import { Project, ProjectStatus } from './project.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';

@Injectable()
export class ProjectsService {
  private projects: Project[] = [];

  getAllProjects() {
    return this.projects;
  }

  getProjectsWithFilters(filterDto: GetProjectsFilterDto): Project[] {
    const { status, search } = filterDto;
    let projects = this.getAllProjects();

    if (status) {
      projects = projects.filter((project) => project.status == status);
    }

    if (search) {
      projects = projects.filter(
        (project) =>
          project.name.includes(search) || project.description.includes(search),
      );
    }
    return projects;
  }

  getProjectById(id: string): Project {
    return this.projects.find((project) => project.id === id);
  }

  createProject(createProjectDto: CreateProjectDto) {
    const { name, description } = createProjectDto;

    const project: Project = {
      id: uuidv4(),
      name,
      description,
      status: ProjectStatus.OPEN,
    };

    this.projects.push(project);
    return project;
  }

  deleteProject(id: string): void {
    this.projects = this.projects.filter((project) => project.id !== id);
  }

  updateProjectStatus(id: string, status: ProjectStatus) {
    const project = this.getProjectById(id);
    project.status = status;
    return project;
  }
}
