import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Execao } from 'src/utils/execoes/execoes';
import { Execoes } from 'src/utils/execoes/execoesDeAjuda';
import { EmpresaParcialDto } from './Services/Dto/EmpresaParcial.Dto';
import { MinhaEmpresa } from './entities/empresa.entity';
import { EmpresaDto } from './Services/Dto/Empresa.dto';

@Injectable()
export class RepositorioDaEmpresa {
  constructor(private readonly prisma: PrismaService) {}

  async criarEmpresa({nomeEmpresa,nomeFantasia,cnpj,email,senha,role,produto}:EmpresaDto, id:string): Promise<MinhaEmpresa> {
    try {
      const CriarEmpresa = await this.prisma.empresa.create({ data:{
        id:id,
        nomeEmpresa:nomeEmpresa,
        nomeFantasia:nomeFantasia,
        cnpj:cnpj,
        email:email,
        senha:senha,
        role:role,
        produto:produto,

      }  });
      return CriarEmpresa;
    } catch (err) {
      throw new Execao(
        Execoes.DatabaseException,
        'Erro ao criar Nome fantasia, CNPJ ou email ja cadastrados',
      );
    }
  }

  async atualizarEmpresa(empresa: EmpresaParcialDto): Promise<MinhaEmpresa> {
    try {
      const AtualizarEmpresa = await this.prisma.empresa.update({
        where: { id: empresa.id },
        data: empresa,
      });
      return AtualizarEmpresa;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException, 'Erro ao atualizar os Dados');
    }
  }

  async deletarEmpresa(id: string): Promise<MinhaEmpresa> {
    try {
      const empresaDeletada = await this.prisma.empresa.delete({
        where: { id: id },
      });
      return empresaDeletada;
    } catch (err) {
      throw new Execao(
        Execoes.DatabaseException,
        'A empresa não foi encontrada no banco de dados',
      );
    }
  }

  async todasEmpresas(): Promise<MinhaEmpresa[]> {
    try {
      const todasEmpresas = await this.prisma.empresa.findMany();
      return todasEmpresas;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException, 'Erro ao conectar ao banco');
    }
  }

  async buscarEmpresaPorId(id: string): Promise<MinhaEmpresa> {
    try {
      const empresaEncontrada = await this.prisma.empresa.findUniqueOrThrow({
        where: { id: id },
      });
      return empresaEncontrada;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException, 'Empresa não encontrada');
    }
  }

  async buscarEmpresaPorEmail(email: string): Promise<MinhaEmpresa> {
    try {
      const emailCadastrado = await this.prisma.empresa.findUniqueOrThrow({
        where: { email: email },
      });
      return emailCadastrado;
    } catch (err) {
      throw new Execao(
        Execoes.DatabaseException,
        'Nem uma empresa cadastrada com esse email',
      );
    }
  }
}
