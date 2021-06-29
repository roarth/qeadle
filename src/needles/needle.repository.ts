import { InternalServerErrorException, Logger } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Project } from 'src/projects/project.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateNeedleDto } from './dto/create-needle.dto';
import { GetNeedlesFilterDto } from './dto/get-needles-filter.dto';
import { Needle } from './needle.entity';

@EntityRepository(Needle)
export class NeedleRepository extends Repository<Needle> {
  private logger = new Logger('NeedleRepository');

  async getNeedles(
    filterDto: GetNeedlesFilterDto,
    @GetUser() user: User,
  ): Promise<Needle[]> {
    const { type, search } = filterDto;
    const query = this.createQueryBuilder('needle');

    if (type) {
      query.andWhere('needle.type = :type', { type: type });
    }

    if (search) {
      query.andWhere('needle.type LIKE :search', { search: `%${search}%` });
    }

    try {
      const needles = await query.getMany();
      return needles;
    } catch (error) {
      this.logger.error(
        `Failed to get Needles for "${user.email}", Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createNeedle(
    createNeedleDto: CreateNeedleDto,
    @GetUser() user: User,
  ): Promise<Needle> {
    const { type } = createNeedleDto;

    const needle = new Needle();
    needle.type = type;

    try {
      await needle.save();
      this.logger.verbose(
        `Needle successfully created by "${user.email}". Data: ${JSON.stringify(
          needle,
        )}`,
      );

      return needle;
    } catch (error) {
      this.logger.error(
        `Failed to create Needle for "${user.email}", Data: ${JSON.stringify(
          createNeedleDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getNeedlesStats() {
    const query = await this.createQueryBuilder('needle')
      .select('needle.type AS type')
      .addSelect('COUNT(needle.type) AS count')
      .groupBy('needle.type')
      .getRawMany();
    try {
      const stats = await query;
      return stats;
    } catch (error) {
      this.logger.error(
        `Failed
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
