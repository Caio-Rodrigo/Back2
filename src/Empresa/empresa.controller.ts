import {
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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AutorizacaoEComerce } from 'src/auth/decorators/e-comerce.decorator';
import { EmpresaLogada } from 'src/auth/decorators/empresa-logada.decorator';
import { TratarExecao } from 'src/utils/execoes/execoesDeAjuda';
import { MinhaEmpresa } from './entities/empresa.entity';
import { EmpresaParcialDto } from './Services/Dto/EmpresaParcial.Dto';
import { EmpresaService } from './Services/empresa.service';

@Controller('empresa')
@ApiTags('Empresas')
export default class EmpresaController {
  constructor(private readonly service: EmpresaService) {}

  @UseGuards(AuthGuard(), AutorizacaoEComerce)
  @ApiBearerAuth()
  @Get()
  async todasEmpresas(): Promise<MinhaEmpresa[]> {
    return await this.service.todasEmpresas();
  }

  @UseGuards(AuthGuard(), AutorizacaoEComerce)
  @ApiBearerAuth()
  @Get(':id')
  async BuscarEmpresaPorId(
    @Param('id') empresaId: string,
  ): Promise<MinhaEmpresa> {
    try {
      return await this.service.buscarEmpresaPorId(empresaId);
    } catch (err) {
      TratarExecao(err);
    }
  }

  @Post()
  async CriarEmpresa(
    @Body()
    { cnpj, email, senha, nomeEmpresa, nomeFantasia }: EmpresaParcialDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.criarEmpresa({
        cnpj,
        email,
        senha,
        nomeEmpresa,
        nomeFantasia,
      });

      response.status(201).send(result);
    } catch (err) {
      TratarExecao(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch()
  async atualizarEmpresa(
    @Body() empresaData: EmpresaParcialDto,
    @EmpresaLogada() empresa: MinhaEmpresa,
  ): Promise<MinhaEmpresa> {
    try {
      if (empresaData.id) {
        delete empresaData.id;
      }
      const dadosParaAtualizacao = { ...empresaData, id: empresa.id };
      return await this.service.atualizarEmpresa(dadosParaAtualizacao);
    } catch (err) {
      TratarExecao(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  async deletarEmpresaPorId(@Param('id') empresaId: string): Promise<string> {
    const empresaADeletar = await this.service.deletarEmpresa(empresaId);
    if (empresaADeletar) {
      return 'Empresa deletada com sucesso';
    } else {
      return 'Empresa não encontrada';
    }
  }
}
