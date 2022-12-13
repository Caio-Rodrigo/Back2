import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Execao } from 'src/utils/execoes/execoes';
import { Execoes } from 'src/utils/execoes/execoesDeAjuda';
import { MeuProduto } from './entities/produtos.entity';
import { ProdutoParcialDto } from './service/Dto/produtoParcial.dto';

@Injectable()
export class RepositorioDeProdutos {
  constructor(private readonly prisma: PrismaService) {}

  async criarProduto(produto: MeuProduto): Promise<MeuProduto> {
    try {
      const criarProduto = await this.prisma.produto.criarProduto({
        data: produto,
      });
      return criarProduto;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException, 'Erro ao criar produto');
    }
  }

  async atualizarProdutos(produto: ProdutoParcialDto): Promise<MeuProduto> {
    try {
      const ProdutoAtualizado = await this.prisma.produto.atualizarProdutos({
        where: { id: produto.id || produto.cod },
        data: produto,
      });
      return ProdutoAtualizado;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException);
    }
  }

  async deletarProduto(id: string): Promise<MeuProduto> {
    try {
      const produtoDeletado = await this.prisma.produto.deletarProduto({
        where: { id: id },
      });
      return produtoDeletado;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException, 'Produto não encontrado');
    }
  }

  async buscarTodosProdutos(): Promise<MeuProduto[]> {
    try {
      const todosProdutos = await this.prisma.produto.buscarTodosProdutos();
      return todosProdutos;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException);
    }
  }

  async buscarProdutoPorId(id: string): Promise<MeuProduto> {
    try {
      const produtoEncontrado = await this.prisma.produto.buscarProdutoPorId({
        where: { id: id },
      });
      return produtoEncontrado;
    } catch (err) {
      throw new Execao(Execoes.DatabaseException);
    }
  }
}
