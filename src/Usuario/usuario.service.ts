import { randomUUID } from 'crypto';
import { MeuUsuario } from './entities/usuario.entity';
import { UsuarioDto } from './UsuarioDto/Usuario.dto';
import { UsuarioParcialDto } from './UsuarioDto/ususarioParcial.Dto';

export class UsuarioService {
  private usuarios: MeuUsuario[] = [];

  async criarUsuario(usuario: UsuarioDto): Promise<MeuUsuario> {
    // aqui ele esta gerando um id ao usuario
    const endidadeUsuario = { ...usuario, id: randomUUID() };
    // aqui ele esta enviando os dados
    this.usuarios.push(endidadeUsuario);
    //aqui ele esta retornando os dados
    return endidadeUsuario;
  }

  async atualizarUsuario(usuarioData: UsuarioParcialDto): Promise<MeuUsuario> {
    // aqui ele esta varrendo os usuarios
    this.usuarios.map((usuario, index) => {
      //compara o id do usuario procurado
      if (usuario.id === usuarioData.id) {
        // traz as informaçoes do usuario
        const AtualizarUsuario = Object.assign(usuario, usuarioData);
        // faz a atualização
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

  async deletarUsuarioId(usuarioId: string): Promise<boolean> {
    const existUsuario = this.usuarios.find((u) => u.id == usuarioId);
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

  async usuarioPorId(usuarioId: string): Promise<MeuUsuario> {
    const existUsuario = this.usuarios.find(
      (usuario) => usuario.id === usuarioId,
    );
    if (!existUsuario) {
      throw new Error('Usuario não encontrado');
    }
    return existUsuario;
  }
}
