import { IsEnum, IsNotEmpty, IsOptional, Max, Min, ValidateIf } from 'class-validator';
import { PaginationDto } from 'src/core/model/pagination.model';
import { EnumChangeStatus } from './absence.enum';
import { ParseNumberString } from 'src/pipe';

export class GetListDto extends PaginationDto {
  @IsOptional()
  keySearch: string;

  @ValidateIf((o) => o.year !== undefined && o.year !== '')
  @ParseNumberString()
  @Min(1)
  year: number;

  @ValidateIf((o) => o.month !== undefined && o.month !== '')
  @ParseNumberString()
  @Min(1)
  @Max(12)
  month: number;
}
