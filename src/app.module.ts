import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthModuleGlobal } from './authenticate/jwt.module';
import { ModulesAdmin } from './module-admin/index.module';

import { ModulesGlobal } from './module-global/index.module';

import { AddDataToHeaderInterceptor } from './interceptors';
import { RepositoryModuleGlobal } from './module-repository/repository.module';

const providers: any = [AppService, { provide: APP_INTERCEPTOR, useClass: AddDataToHeaderInterceptor }];

@Module({
  imports: [JwtAuthModuleGlobal, ModulesGlobal, ModulesAdmin, RepositoryModuleGlobal],
  controllers: [AppController],
  providers: providers,
})
export class AppModule {}
