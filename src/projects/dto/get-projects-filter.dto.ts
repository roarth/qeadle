import { ProjectStatus } from '../project.model';

export class GetProjectsFilterDto {
  status: ProjectStatus;
  search: string;
}
