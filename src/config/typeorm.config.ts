import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'kamoulox',
  database: 'qeadle',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
