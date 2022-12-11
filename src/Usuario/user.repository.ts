import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Execao } from 'src/utils/execoes/execoes';
import { Execoes } from 'src/utils/execoes/execoesDeAjuda';
import { MeuUsuario } from './entities/usuario.entity';
import { UsuarioParcialDto } from './service/UsuarioDto/ususarioParcial.Dto';

@Injectable()
export class RepositorioUsuario {
  constructor(private readonly prisma: PrismaService) {}

  async criarUsuario(usuario: MeuUsuario): Promise<MeuUsuario> {
    try {
      const CriarUsuario = await this.prisma.usuario.create({ data: usuario });
      return CriarUsuario;
    } catch (err) {
      throw new Execao(
        Execoes.DatabaseException,
        'Erro ao criar usuário cpf ou email ja cadastrados',
      );
    }
  }

  async atualizarUsuario(usuario: UsuarioParcialDto): Promise<MeuUsuario> {
    try {
      const AtualizarUsuario = await this.prisma.usuario.update({
        where: { id: usuario.id },
        data: usuario,
      });
      return AtualizarUsuario;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException);
    }
  }

  async deletarUsuario(id: string): Promise<MeuUsuario> {
    try {
      const DeletarUsuario = await this.prisma.usuario.delete({
        where: { id: id },
      });
      return DeletarUsuario;
    } catch (err) {
      throw new Execao(
        Execoes.DatabaseException,
        'usuário não encontrado no Banco de Dados',
      );
    }
  }

  async buscarTodosuarios(): Promise<MeuUsuario[]> {
    try {
      const BuscarTodosuarios = await this.prisma.usuario.findMany();
      return BuscarTodosuarios;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException);
    }
  }

  async buscarUsuarioPorId(id: string): Promise<MeuUsuario> {
    try {
      const EncontrarUsuario = await this.prisma.usuario.findUniqueOrThrow({
        where: { id: id },
      });
      return EncontrarUsuario;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException);
    }
  }

  async buscarUsuarioPorEmail(email: string): Promise<MeuUsuario> {
    try {
      const usuarioEncontrado = await this.prisma.usuario.findUniqueOrThrow({
        where: { email: email },
      });
      return usuarioEncontrado;
    } catch (err) {
      throw new Execao(
        Execoes.DatabaseException,
        'usuário não encontrado com este e-mail',
      );
    }
  }
}
