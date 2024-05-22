import { BadRequestException, Injectable } from '@nestjs/common';
import _ from 'lodash';

import { EnumResponseError } from './absence.enum';
import { AbsenceHelper } from './absence.helper';
import { GetListDto } from './absence.dto';
import { AbsenceRepository } from 'src/module-repository/repository';

@Injectable()
export class AbsenceService {
  constructor(private helper: AbsenceHelper, private readonly absenceRepository: AbsenceRepository) {}

  async getList() {
    const entity = this.absenceRepository.create({
      test: true,
    });
    const result = await this.absenceRepository.save(entity);

    return result;
  }

  async getById() {
    const result = await this.absenceRepository.findAndCount();

    return result;
  }
}
