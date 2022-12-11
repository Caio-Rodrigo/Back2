import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MeuUsuario } from 'src/Usuario/entities/usuario.entity';

export const UsuarioLogado = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): MeuUsuario => {
    const request = ctx.switchToHttp().getRequest();
    return request.usuario;
  },
);
