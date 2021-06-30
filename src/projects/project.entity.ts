import { Needle } from '../needles/needle.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectStatus } from './project-status.enum';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: ProjectStatus;

  @OneToMany(() => Needle, (needle) => needle.project, { eager: true })
  needles: Needle[];
}
