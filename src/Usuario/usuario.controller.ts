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
  UseGuards,
} from '@nestjs/common';
import { MeuUsuario } from './entities/usuario.entity';
import { UsuarioService } from './service/usuario.service';
import { UsuarioDto } from './service/UsuarioDto/Usuario.dto';
import { Response } from 'express';
import { UsuarioParcialDto } from './service/UsuarioDto/ususarioParcial.Dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AutorizacaoEComerce } from 'src/auth/decorators/e-comerce.decorator';

@Controller('usuario')
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}

  @UseGuards(AuthGuard(), AutorizacaoEComerce)
  @ApiBearerAuth()
  @Get()
  async todosUsuarios(): Promise<MeuUsuario[]> {
    return await this.service.todosUsuarios();
  }

  @UseGuards(AuthGuard(), AutorizacaoEComerce)
  @ApiBearerAuth()
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
    { cpf, email, nomeCompleto, usuario, senha, role }: UsuarioDto,
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

  @UseGuards(AuthGuard(), AutorizacaoEComerce)
  @ApiBearerAuth()
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

  @UseGuards(AuthGuard(), AutorizacaoEComerce)
  @ApiBearerAuth()
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
