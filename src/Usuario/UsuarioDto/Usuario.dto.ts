import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nomeCompleto: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  senha: string;


  @ApiProperty()
  @IsString()
  role:string;
}
