import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Execao } from 'src/utils/execoes/execoes';
import { Execoes } from 'src/utils/execoes/execoesDeAjuda';
import { MeuUsuario } from '../entities/usuario.entity';
import { RepositorioUsuario } from '../user.repository';
import { UsuarioDto } from './UsuarioDto/Usuario.dto';
import { UsuarioParcialDto } from './UsuarioDto/ususarioParcial.Dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly repositorioDoUsuario: RepositorioUsuario) {}

  async criarUsuario(usuario: UsuarioDto): Promise<MeuUsuario> {
    const endidadeUsuario = { ...usuario, id: randomUUID(), role: 'usuario' };

    if (usuario.senha.length <= 7) {
      throw new Execao(
        Execoes.InvalidData,
        'a senha deve conter pelomenos 7 caracteres',
      );
    }
    const hashSenha = await hash(usuario.senha, 10);
    endidadeUsuario.senha = hashSenha;
    const usuarioCriado = await this.repositorioDoUsuario.criarUsuario(
      endidadeUsuario,
    );
    delete usuarioCriado.senha;
    return usuarioCriado;
  }

  async atualizarUsuario(usuarioData: UsuarioParcialDto): Promise<MeuUsuario> {
    if (usuarioData.senha) {
      const hashSenha = await hash(usuarioData.senha, 10);
      const atualizarOUsuario = { ...usuarioData, senha: hashSenha };
      const usuarioAtualizado =
        await this.repositorioDoUsuario.atualizarUsuario(atualizarOUsuario);
      return usuarioAtualizado;
    }
    const usuarioAtualizado = await this.repositorioDoUsuario.atualizarUsuario(
      usuarioData,
    );
    delete usuarioAtualizado.senha;
    return usuarioAtualizado;
  }

  async todosUsuarios(): Promise<MeuUsuario[]> {
    return await this.repositorioDoUsuario.buscarTodosuarios();
  }

  async usuarioPorId(usuarioId: string): Promise<MeuUsuario> {
    const buscarUsuario = await this.repositorioDoUsuario.buscarUsuarioPorId(
      usuarioId,
    );
    delete buscarUsuario.senha;
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

  async buscarUsuarioPorEmail(email: string): Promise<MeuUsuario> {
    const usuario = await this.repositorioDoUsuario.buscarUsuarioPorEmail(
      email,
    );
    return usuario;
  }
}
