/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabasesModule } from 'src/prisma/database.module';
import EmpresaController from './empresa.controller';
import { RepositorioDaEmpresa } from './empresa.repository';
import { EmpresaService } from './Services/empresa.service';

@Module({
  imports: [
    DatabasesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [EmpresaController],
  providers: [EmpresaService, RepositorioDaEmpresa],
  exports: [EmpresaService],
})
export class EmpresaModule {}
