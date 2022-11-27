import { UsuarioController } from './Usuario/usuario.controller';
import { UsuarioService } from './Usuario/usuario.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class AppModule {}
