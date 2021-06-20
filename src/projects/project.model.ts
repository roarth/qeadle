export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
}

export enum ProjectStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
