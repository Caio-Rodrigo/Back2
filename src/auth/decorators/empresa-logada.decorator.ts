import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MinhaEmpresa } from 'src/Empresa/entities/empresa.entity';


export const EmpresaLogada = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): MinhaEmpresa => {
    const request = ctx.switchToHttp().getRequest();
    return request.empresa;
  },
);
