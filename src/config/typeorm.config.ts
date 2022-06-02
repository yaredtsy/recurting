import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'containers-us-west-55.railway.app',
  port: 7501,
  username: 'postgres',
  password: '6Bx7xKm5On8ANIpv8I4u',
  database: 'railway',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
  autoLoadEntities: true,
};
