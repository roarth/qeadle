import {
  Body,
  Controller,
  Delete,
  Get,
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
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { ProjectStatusValidationPipe } from './pipes/project-status-validation.pipe';
import { ProjectStatus } from './project-status.enum';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects(
    @Query(ValidationPipe) filterDto: GetProjectsFilterDto,
  ): Promise<Project[]> {
    return this.projectsService.getProjects(filterDto);
  }

  @Get('/:id')
  getProjectById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Project> {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.createProject(createProjectDto);
  }

  @Delete('/:id')
  deleteProject(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.projectsService.deleteProject(id);
  }

  @Patch('/:id/status')
  updateProjectStatus(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body('status', ProjectStatusValidationPipe) status: ProjectStatus,
  ): Promise<Project> {
    return this.projectsService.updateProjectStatus(id, status);
  }
}
