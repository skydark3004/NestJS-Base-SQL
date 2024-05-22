import { Module } from '@nestjs/common';

import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';
import { AbsenceHelper } from './absence.helper';

@Module({
  imports: [],
  controllers: [AbsenceController],
  providers: [AbsenceService, AbsenceHelper],
  exports: [AbsenceService],
})
export class AbsenceModuleAdmin {}
