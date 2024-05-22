import { DataSource, Repository } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';

export class CommonRepository<T> extends Repository<T> {
  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  someCommonMethod() {
    return 'test';
  }
}
