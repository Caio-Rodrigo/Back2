import { PartialType } from '@nestjs/swagger';
import { EmpresaDto } from './Empresa.dto';

export class EmpresaParcialDto extends PartialType(EmpresaDto) {
  id: string;
  role?: string;
}

export class AtualizaçãoEmpresarialDto extends PartialType(EmpresaDto) {}
