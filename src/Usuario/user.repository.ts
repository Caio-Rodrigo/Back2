import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MeuUsuario } from './entities/usuario.entity';
import { UsuarioParcialDto } from './UsuarioDto/ususarioParcial.Dto';

@Injectable()
export class RepositorioUsuario {
  constructor(private readonly prisma: PrismaService) {}

  async criarUsuario(usuario: MeuUsuario): Promise<MeuUsuario> {
    const CriarUsuario = await this.prisma.usuario.create({ data: usuario });
    return CriarUsuario;
  }

  async atualizarUsuario(usuario: UsuarioParcialDto): Promise<MeuUsuario> {
    const AtualizarUsuario = await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: usuario,
    });
    return AtualizarUsuario;
  }

  async deletarUsuario(id: string): Promise<MeuUsuario> {
    const DeletarUsuario = await this.prisma.usuario.delete({
      where: { id: id },
    });
    return DeletarUsuario;
  }

  async buscarTodosuarios(): Promise<MeuUsuario[]> {
    const BuscarTodosuarios = await this.prisma.usuario.findMany();
    return BuscarTodosuarios;
  }

  async buscarUsuarioPorId(id: string): Promise<MeuUsuario> {
    const EncontrarUsuario = await this.prisma.usuario.findUniqueOrThrow({
      where: { id: id },
    });
    return EncontrarUsuario;
  }
}
