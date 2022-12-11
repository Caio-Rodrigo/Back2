import { PartialType } from '@nestjs/swagger';
import { UsuarioDto } from './Usuario.dto';

export class UsuarioParcialDto extends PartialType(UsuarioDto) {
  id: string;
}

export class AtualizacaoParcialUsuarioDto extends PartialType(UsuarioDto){}