import { IsNumberString, ValidateIf } from 'class-validator';

export class PaginationDto {
  @ValidateIf((o) => o.select !== undefined && o.select !== '')
  select?: Record<string, any> & string;

  @ValidateIf((o) => o.sort !== undefined && o.sort !== '')
  sort?: Record<string, any> & string;

  @ValidateIf((o) => o.offset !== undefined && o.offset !== '')
  @IsNumberString()
  offset?: number;

  @ValidateIf((o) => o.page !== undefined && o.page !== '')
  @IsNumberString()
  page?: number;

  @ValidateIf((o) => o.pageSize !== undefined && o.pageSize !== '')
  @IsNumberString()
  pageSize?: number;
}

export class OptionPaginate {
  populate: any[];
  page: number;
  limit: number;
}
