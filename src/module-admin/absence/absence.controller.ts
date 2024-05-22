import { Controller, Get, Param, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AbsenceService } from './absence.service';
import { GetListDto } from './absence.dto';
import { Auth } from 'src/decorators';
import { configMulter } from 'src/configs/multer.config';

@Controller('/admin/absence')
export class AbsenceController {
  constructor(private absenceService: AbsenceService) {}

  @Get('/list')
  /*   @Auth({
    roles: ['test', '123'],
  }) */
  async getList() {
    const res = await this.absenceService.getList();
    return res;
  }

  @Get('/:id')
  /*   @Auth({
    roles: [EnumRoleCode.EMPLOYEE, EnumRoleCode.ADMIN],
  }) */
  async getById(@Param('id') id: any) {
    const res = await this.absenceService.getById();
    return res;
  }
}
