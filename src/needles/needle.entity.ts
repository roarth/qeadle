import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NeedleType } from './needle-type.enum';

@Entity()
export class Needle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  type: NeedleType;
}
