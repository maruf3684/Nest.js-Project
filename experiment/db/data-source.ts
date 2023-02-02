import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'maruf15-1927@',
  database: 'db_experiment_nest',
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/db/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;