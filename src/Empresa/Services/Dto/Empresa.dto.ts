import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmpresaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nomeEmpresa: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nomeFantasia: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;

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
  role: string;
}
