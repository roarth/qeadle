import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { ProjectStatus } from '../project-status.enum';

export class GetProjectsFilterDto {
  @IsOptional()
  @IsIn([ProjectStatus.OPEN, ProjectStatus.CLOSED])
  status: ProjectStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
