import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { APP_CONFIG } from '../configs/app.config';

interface IPayload {
  email: string;
  userId: string;
  roleCode?: any;
  accountGroupId?: string;
  iat?: number;
  exp?: number;
  accountGroup?: any;
  expiredAt?: Date;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: APP_CONFIG.ENV.SECURE.JWT.SECRET_KEY,
    });
  }

  async validate(payload: IPayload) {
    if (!payload.roleCode) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
