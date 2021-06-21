import { EntityRepository, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { ProjectStatus } from './project-status.enum';
import { Project } from './project.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async getProjects(filterDto: GetProjectsFilterDto): Promise<Project[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('project');

    if (status) {
      query.andWhere('project.status = :status', { status: status });
    }

    if (search) {
      query.andWhere(
        'project.name LIKE :search OR project.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const projects = await query.getMany();
    return projects;
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, description } = createProjectDto;

    const project = new Project();
    project.name = name;
    project.description = description;
    project.status = ProjectStatus.OPEN;

    await project.save();

    return project;
  }
}
