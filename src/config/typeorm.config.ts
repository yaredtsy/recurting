import { TypeOrmModuleOptions } from '@nestjs/typeorm';
console.log(process.env.LOGIN_SUCCESS_REDIRECT_URL);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
  autoLoadEntities: true,
};
