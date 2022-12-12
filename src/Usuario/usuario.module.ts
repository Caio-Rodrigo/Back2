

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabasesModule } from 'src/prisma/database.module';
import { UsuarioService } from './service/usuario.service';
import { RepositorioUsuario } from './user.repository';
import { UsuarioController } from './usuario.controller';

@Module({
    imports: [DatabasesModule, PassportModule.register({defaultStrategy:'jwt'})],
    controllers: [UsuarioController],
    providers: [UsuarioService, RepositorioUsuario],
    exports:[UsuarioService]
})
export class UsuarioModule {}
