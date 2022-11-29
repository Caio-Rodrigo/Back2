import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { MeuUsuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './UsuarioDto/Usuario.dto';
import { Response } from 'express';
import { UsuarioParcialDto } from './UsuarioDto/ususarioParcial.Dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}

  @Get()
  async todosUsuarios(): Promise<MeuUsuario[]> {
    return await this.service.todosUsuarios();
  }

  @Get(':id')
  async usuarioPorId(@Param('id') usuarioId: string): Promise<MeuUsuario> {
    try {
      return await this.service.usuarioPorId(usuarioId);
    } catch (err) {
      console.log(err);
    }
  }

  @Post()
  async criarUsuario(
    @Body()
    {
      cpf,
      email,
      nomeCompleto,
      usuario,
      senha,
      role
    }: UsuarioDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.criarUsuario({
        nomeCompleto,
        usuario,
        cpf,
        email,
        senha,
        role,
      });
      response.status(201).send(result);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

  @Patch()
  async atualizarUsuario(
    @Body() usuarioData: UsuarioParcialDto,
  ): Promise<MeuUsuario> {
    try {
      return await this.service.atualizarUsuario(usuarioData);
    } catch (err) {
      console.log(err);
    }
  }

  @Delete(':id')
  async deletarUsuarioId(@Param('id') usuarioId: string): Promise<string> {
    const usuarioDeletado = await this.service.deletarUsuarioId(usuarioId);
    console.log(usuarioDeletado);
    if (usuarioDeletado) {
      return 'O usuario Foi deletado com sucesso!';
    } else {
      return 'O usuario não foi encontrado!';
    }
  }
}
