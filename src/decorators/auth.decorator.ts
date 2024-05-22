import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { EnumMetadata } from 'src/core/enum';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

export function Auth(params: { roles?: string[]; allowAnonymous?: boolean; allowSecret?: boolean; onlyPostman?: true }) {
  return applyDecorators(
    SetMetadata(EnumMetadata.ROLES, params.roles),
    SetMetadata(EnumMetadata.ALLOW_ANONYMOUS, params.allowAnonymous),
    SetMetadata(EnumMetadata.ALLOW_SECRET, params.allowSecret),
    SetMetadata(EnumMetadata.ONLY_POSTMAN, params.onlyPostman),
    UseGuards(JwtAuthGuard),
  );
}
