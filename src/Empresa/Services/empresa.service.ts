import { Injectable } from '@nestjs/common';
import { Hash, randomUUID } from 'node:crypto';
import { Execao } from 'src/utils/execoes/execoes';
import { Execoes } from 'src/utils/execoes/execoesDeAjuda';
import { RepositorioDaEmpresa } from '../empresa.repository';
import { EmpresaDto } from './Dto/Empresa.dto';
import { EmpresaParcialDto } from './Dto/EmpresaParcial.Dto';
import { MinhaEmpresa } from '../entities/empresa.entity';
import { hash } from 'bcrypt';

@Injectable()
export class EmpresaService {
  constructor(private readonly repositorioDaEmpresa: RepositorioDaEmpresa) {}

  async criarEmpresa(Empresa: EmpresaDto): Promise<MinhaEmpresa> {
    const endidadeEmpresa: MinhaEmpresa = {
      ...Empresa,
      id: randomUUID(),
      role: 'epresa',
    };
    if (Empresa.senha.length <= 7) {
      throw new Execao(
        Execoes.InvalidData,
        'a senha deve conter pelomenos 7 caracteres',
      );
    }
    const hashSenha = await hash(Empresa.senha, 10);
    endidadeEmpresa.senha = hashSenha;
    const EmpresaCriada = await this.repositorioDaEmpresa.criarEmpresa(
      endidadeEmpresa,
    );
    delete EmpresaCriada.senha;
    return EmpresaCriada;
  }

  async atualizarEmpresa(
    empresaData: EmpresaParcialDto,
  ): Promise<MinhaEmpresa> {
    if (empresaData.senha) {
      const hashSenha = await hash(empresaData.senha, 10);
      const atualizarAEmpresa = { ...empresaData, senha: hashSenha };
      const empresaAtualizada =
        await this.repositorioDaEmpresa.atualizarEmpresa(atualizarAEmpresa);
      return empresaAtualizada;
    }
    const empresaAtualizada = await this.repositorioDaEmpresa.atualizarEmpresa(
      empresaData,
    );
    delete empresaAtualizada.senha;
    return empresaAtualizada;
  }

  async todasEmpresas(): Promise<MinhaEmpresa[]> {
    return await this.repositorioDaEmpresa.todasEmpresas();
  }

  async buscarEmpresaPorId(empresaId: string): Promise<MinhaEmpresa> {
    const buscarUsuario =
      this.repositorioDaEmpresa.buscarEmpresaPorId(empresaId);
    return buscarUsuario;
  }

  async deletarEmpresa(empresaId: string): Promise<boolean> {
    try {
      const existeUsuario = this.repositorioDaEmpresa.deletarEmpresa(empresaId);
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

  async buscarPorEmail(email: string): Promise<MinhaEmpresa> {
    const empresa = await this.repositorioDaEmpresa.buscarEmpresaPorEmail(
      email,
    );
    return empresa;
  }
}
