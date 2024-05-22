import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { isEmpty } from 'lodash';
import { APP_CONFIG } from '../configs/app.config';
import { EnumMetadata } from 'src/core/enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    //const request = context.switchToHttp().getRequest();
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // custom message khi token hết hạn
    if (info?.message === 'jwt expired') {
      throw new UnauthorizedException('Access token has expired!');
    }

    if (err) throw err;

    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>(EnumMetadata.ROLES, context.getHandler());
    const allowAnonymous = this.reflector.get(EnumMetadata.ALLOW_ANONYMOUS, context.getHandler());
    const allowSecret = this.reflector.get(EnumMetadata.ALLOW_SECRET, context.getHandler());
    const onlyPostman = this.reflector.get(EnumMetadata.ONLY_POSTMAN, context.getHandler());

    if (onlyPostman) {
      if (request.headers['only-postman'] === 'true') return user;
      else throw new ForbiddenException('You dont have permission to access this resource');
    }

    if (allowAnonymous) {
      return user;
    }

    const secretKey = request.headers['secret-key'];

    // verify secret
    if (allowSecret && secretKey) {
      if (isEmpty(secretKey)) throw new UnauthorizedException();
      if (secretKey !== APP_CONFIG.ENV.SECURE.SECRET_KEY) throw new ForbiddenException('You dont have permission to access this resource');
    }

    if (!user || !roles) throw new UnauthorizedException();
    if (!roles.includes(user.roleCode)) throw new ForbiddenException('You dont have permission to access this resource');

    return user;
  }
}
