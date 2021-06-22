import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { ProjectStatusValidationPipe } from './pipes/project-status-validation.pipe';
import { ProjectStatus } from './project-status.enum';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectsController {
  private logger = new Logger('ProjectsController');
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects(
    @Query(ValidationPipe) filterDto: GetProjectsFilterDto,
    @GetUser() user: User,
  ): Promise<Project[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all Projects. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.projectsService.getProjects(filterDto, user);
  }

  @Get('/:id')
  getProjectById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @GetUser() user: User,
  ): Promise<Project> {
    this.logger.verbose(
      `User "${user.email}" retrieving specific Project. ID: ${JSON.stringify(
        id,
      )}`,
    );
    return this.projectsService.getProjectById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: User,
  ): Promise<Project> {
    this.logger.verbose(
      `User "${user.email}" creating a Project. Data: ${JSON.stringify(
        createProjectDto,
      )}`,
    );
    return this.projectsService.createProject(createProjectDto, user);
  }

  @Delete('/:id')
  deleteProject(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.email}" deleting a Project. ID: ${JSON.stringify(id)}`,
    );
    return this.projectsService.deleteProject(id);
  }

  @Patch('/:id/status')
  updateProjectStatus(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body('status', ProjectStatusValidationPipe) status: ProjectStatus,
    @GetUser() user: User,
  ): Promise<Project> {
    this.logger.verbose(
      `User "${user.email}" updating a Project status. ID: ${JSON.stringify(
        id,
      )}, Status: ${JSON.stringify(status)}`,
    );
    return this.projectsService.updateProjectStatus(id, status);
  }
}
