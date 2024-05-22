import { Module } from '@nestjs/common';
import { AbsenceModuleAdmin } from './absence/absence.module';

@Module({
  imports: [AbsenceModuleAdmin],
})
export class ModulesAdmin {}
