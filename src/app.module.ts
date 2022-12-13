import { EmpresaModule } from './Empresa/empresa.module';
import { UsuarioModule } from './Usuario/usuario.module';
import { AuthModule } from './auth/autenticacao.module';

import { Module } from '@nestjs/common';
import { DatabasesModule } from './prisma/database.module';
import { ProdutoModule } from './Produtos/produto.module';

@Module({
  imports: [
    EmpresaModule,
    UsuarioModule,
    AuthModule,
    DatabasesModule,
    ProdutoModule,
  ],
})
export class AppModule {}
