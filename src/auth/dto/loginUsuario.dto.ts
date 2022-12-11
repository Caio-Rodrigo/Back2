import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UsuarioLoginDto {
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  senha: string;
}
