import { UsuarioController } from './Usuario/usuario.controller';
import { UsuarioService } from './Usuario/usuario.service';

import { Module } from '@nestjs/common';
import { DatabasesModule } from './prisma/database.module';
import { RepositorioUsuario } from './Usuario/user.repository';

@Module({
  imports: [DatabasesModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, RepositorioUsuario],
})
export class AppModule {}
