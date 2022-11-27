import { randomUUID } from 'crypto';
import { MeuUsuario } from './entities/usuario.entity';
import { UsuarioDto } from './UsuarioDto/Usuario.dto';
import { UsuarioParcialDto } from './UsuarioDto/ususarioParcial.Dto';

export class UsuarioService {
  private usuarios: MeuUsuario[] = [];

  async criarUsuario(usuario: UsuarioDto): Promise<MeuUsuario> {
    const endidadeUsuario = { ...usuario, id: randomUUID() };
    this.usuarios.push(endidadeUsuario);
    return endidadeUsuario;
  }

  async atualizarUsuario(usuarioData: UsuarioParcialDto): Promise<MeuUsuario> {
    this.usuarios.map((usuario, index) => {
      if (usuario.id === usuarioData.id) {
        const AtualizarUsuario = Object.assign(usuario, usuarioData);
        this.usuarios.splice(index, 1, AtualizarUsuario);
      }
    });
    const usuarioAtuazado = this.usuarios.find(
      (usuario) => usuario.id === usuarioData.id,
    );
    return usuarioAtuazado;
  }

  async todosUsuarios(): Promise<MeuUsuario[]> {
    return this.usuarios;
  }

  async usuarioPorId(usuarioId: string): Promise<MeuUsuario> {
    const existUsuario = this.usuarios.find(
      (usuario) => usuario.id === usuarioId,
    );
    if (!existUsuario) {
      throw new Error('Usuario não encontrado');
    }
    return existUsuario;
  }

  async deletarUsuarioId(usuarioId: string): Promise<boolean> {
    const existUsuario = this.usuarios.find(
      (usuario) => usuario.id == usuarioId,
    );
    if (!existUsuario) {
      return false;
    }
    this.usuarios.map((usuario, index) => {
      if (usuario.id === usuarioId) {
        this.usuarios.slice(index, 1);
      }
    });
    return true;
  }
}
