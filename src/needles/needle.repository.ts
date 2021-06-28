import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Needle } from './needle.entity';

@EntityRepository(Needle)
export class NeedleRepository extends Repository<Needle> {
  private logger = new Logger('NeedleRepository');
}
