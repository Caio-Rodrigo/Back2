import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AutorizacaoEComerce implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const httpRequest = context.switchToHttp().getRequest();

    const usuarioData = httpRequest.usuario;

    if (usuarioData?.role === 'empresa') {
      return true;
    }

    throw new UnauthorizedException(
      'O usuário não tem permissão para o acesso da rota solicitada.',
    );
  }
}
