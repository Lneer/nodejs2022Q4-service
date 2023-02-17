import * as dotenv from 'dotenv';
import { UserEntity } from 'src/User/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export default {
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: false,
  entities: [UserEntity],
} as DataSourceOptions;
