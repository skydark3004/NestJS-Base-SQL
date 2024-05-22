import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CommonRepository } from 'src/libs/typeorm/common.repository';
import { Character } from 'src/core/entity/character.entity';
import { ProvideOfProvidersEnum } from 'src/core/enum';

@Injectable()
export class AbsenceRepository extends CommonRepository<Character> {
  constructor(
    @Inject(ProvideOfProvidersEnum.DATA_SOURCE)
    private dataSource: DataSource,
  ) {
    super(Character, dataSource);
  }
}
