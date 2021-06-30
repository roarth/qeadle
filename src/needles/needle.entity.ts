import { Project } from '../projects/project.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NeedleEnvironment } from './enum/needle-environment.enum';
import { NeedleResult } from './enum/needle-result.enum';
import { NeedleType } from './enum/needle-type.enum';

@Entity()
export class Needle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  type: NeedleType;

  @Column()
  result: NeedleResult;

  @Column()
  environment: NeedleEnvironment;

  @ManyToOne(() => Project, (project) => project.needles, { eager: false })
  project: Project;
}
