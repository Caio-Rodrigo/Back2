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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AutorizacaoEComerce } from 'src/auth/decorators/e-comerce.decorator';
import { EmpresaLogada } from 'src/auth/decorators/empresa-logada.decorator';
import { TratarExecao } from 'src/utils/execoes/execoesDeAjuda';
import { MeuProduto } from './entities/produtos.entity';
import { ProdutoParcialDto } from './service/Dto/produtoParcial.dto';
import { ProdutosDto } from './service/Dto/produtos.dto';
import { ProdutoService } from './service/produtos.service';

@Controller('produtos')
@ApiTags('Produtos')
export class ProdutosController {
  constructor(private readonly service: ProdutoService) {}

  @UseGuards(AuthGuard(), AutorizacaoEComerce)
  @ApiBearerAuth()
  @Get()
  async todosProdutos(): Promise<MeuProduto[]> {
    try {
      return await this.service.todosProdutos();
    } catch (err) {
      TratarExecao(err);
    }
  }

  @UseGuards(AuthGuard(), AutorizacaoEComerce)
  @ApiBearerAuth()
  @Get(':id')
  async ProdutoPorId(@Param('id') produtoId: string): Promise<MeuProduto> {
    try {
      return await this.service.produtoPorId(produtoId);
    } catch (err) {
      TratarExecao(err);
    }
  }

  @Post()
  async criarProduto(
    @Body() { cod, empresa, produto }: ProdutosDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.criarProduto({
        cod,
        empresa,
        produto,
      });
      response.status(201).send(result);
    } catch (err) {
      TratarExecao(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch()
  async atualizarProduto(
    @Body() produtoData: ProdutoParcialDto,
    @EmpresaLogada() produto: MeuProduto,
  ): Promise<MeuProduto> {
    try {
      if (produtoData.id) {
        delete produtoData.id;
      }
      const produtoAtualizado = { ...produtoData, id: produto.id };
      return await this.service.atualizarProduto(produtoAtualizado);
    } catch (err) {
      TratarExecao(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  async deletarProduto(@Param('id') produtoId: string): Promise<string> {
    const produtoDeletado = await this.service.deletarProduto(produtoId);
    if (produtoDeletado) {
      return 'Produto deletado com sucesso';
    } else {
      return 'Produto não encontado';
    }
  }
}
