import { EmpresaModule } from './Empresa/empresa.module';
import { UsuarioModule } from './Usuario/usuario.module';
import { AuthModule } from './auth/autenticacao.module';

import { Module } from '@nestjs/common';
import { DatabasesModule } from './prisma/database.module';

@Module({
  imports: [EmpresaModule, UsuarioModule, AuthModule, DatabasesModule],
})
export class AppModule {}
