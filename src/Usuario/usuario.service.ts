import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MeuUsuario } from './entities/usuario.entity';
import { RepositorioUsuario } from './user.repository';
import { UsuarioDto } from './UsuarioDto/Usuario.dto';
import { UsuarioParcialDto } from './UsuarioDto/ususarioParcial.Dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly repositorioDoUsuario: RepositorioUsuario) {}

  async criarUsuario(usuario: UsuarioDto): Promise<MeuUsuario> {
    const endidadeUsuario = { ...usuario, id: randomUUID() };
    const usuarioCriado = await this.repositorioDoUsuario.criarUsuario(
      endidadeUsuario,
    );
    return usuarioCriado;
  }

  async atualizarUsuario(usuarioData: UsuarioParcialDto): Promise<MeuUsuario> {
    const atualizarUsuario = await this.repositorioDoUsuario.atualizarUsuario(
      usuarioData,
    );
    return atualizarUsuario;
  }

  async todosUsuarios(): Promise<MeuUsuario[]> {
    return await this.repositorioDoUsuario.buscarTodosuarios();
  }

  async usuarioPorId(usuarioId: string): Promise<MeuUsuario> {
    const buscarUsuario =
      this.repositorioDoUsuario.buscarUsuarioPorId(usuarioId);
    return buscarUsuario;
  }

  async deletarUsuarioId(usuarioId: string): Promise<boolean> {
    try {
      const existeUsuario = this.repositorioDoUsuario.deletarUsuario(usuarioId);
      if (existeUsuario) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
