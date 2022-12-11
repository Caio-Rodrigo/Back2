import { AutenticacaoModule } from './auth/autenticacao.module';
import { AutenticacaoService } from './auth/autenticacao.service';
import EmpresaController from './Empresa/empresa.controller';
import { EmpresaService } from './Empresa/Services/empresa.service';
import { UsuarioController } from './Usuario/usuario.controller';
import { UsuarioService } from './Usuario/service/usuario.service';

import { Module } from '@nestjs/common';
import { DatabasesModule } from './prisma/database.module';
import { RepositorioUsuario } from './Usuario/user.repository';

@Module({
  imports: [AutenticacaoModule, DatabasesModule],
  controllers: [EmpresaController, UsuarioController],
  providers: [
    AutenticacaoService,
    EmpresaService,
    UsuarioService,
    RepositorioUsuario,
  ],
})
export class AppModule {}
