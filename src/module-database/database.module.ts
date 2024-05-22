import { Logger, Module } from '@nestjs/common';
import { ormConfig } from 'src/configs/orm.config';
import { ProvideOfProvidersEnum } from 'src/core/enum';
import { DataSource } from 'typeorm';

const logNestJS: Logger = new Logger('TypeORM Connection');

export const databaseProviders = {
  provide: ProvideOfProvidersEnum.DATA_SOURCE,
  useFactory: async () => {
    const dataSource = new DataSource(ormConfig);
    dataSource
      .initialize()
      .then(() => {
        logNestJS.log(`Connected PostgreSQL successfully!`);
      })
      .catch((err) => {
        logNestJS.error(`Connected PostgreSQL error`, err);
      });

    return dataSource;
  },
};

@Module({
  providers: [databaseProviders],
  exports: [databaseProviders],
})
export class DatabaseModule {}
