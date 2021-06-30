import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { ProjectStatus } from './project-status.enum';
import { Project } from './project.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  private logger = new Logger('ProjectRepository');

  async getProjects(
    filterDto: GetProjectsFilterDto,
    user: User,
  ): Promise<Project[]> {
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

    try {
      const projects = await query.getMany();
      return projects;
    } catch (error) {
      this.logger.error(
        `Failed to get Projects for "${user.email}", Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<Project> {
    const { name, description } = createProjectDto;

    const project = new Project();
    project.name = name;
    project.description = description;
    project.status = ProjectStatus.OPEN;

    try {
      await project.save();
      this.logger.verbose(
        `Project successfully created by "${
          user.email
        }". Data: ${JSON.stringify(project)}`,
      );

      return project;
    } catch (error) {
      this.logger.error(
        `Failed to create Project for "${user.email}", Data: ${JSON.stringify(
          createProjectDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getProjectsStats() {
    const query = await this.createQueryBuilder('project')
      .select('project.status AS status')
      .addSelect('COUNT(project.status) AS count')
      .groupBy('project.status')
      .getRawMany();
    try {
      const projects = await query;
      return projects;
    } catch (error) {
      this.logger.error(
        `Failed
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
