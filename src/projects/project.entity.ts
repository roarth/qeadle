import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectStatus } from './project-status.enum';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: ProjectStatus;
}
