import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MeuProduto } from '../entities/produtos.entity';
import { RepositorioDeProdutos } from '../produtos.repository';
import { ProdutoParcialDto } from './Dto/produtoParcial.dto';
import { ProdutosDto } from './Dto/produtos.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly repositorioProdutos: RepositorioDeProdutos) {}

  async criarProduto(produto: ProdutosDto): Promise<MeuProduto> {
    const entidadeDoProduto: MeuProduto = {
      ...produto,
      id: randomUUID(),
      role: 'empresa',
    };
    const produtoCriado = await this.repositorioProdutos.criarProduto(
      entidadeDoProduto,
    );
    return produtoCriado;
  }

  async atualizarProduto(produtoData: ProdutoParcialDto): Promise<MeuProduto> {
    const produtoAtualizado = await this.repositorioProdutos.atualizarProdutos(
      produtoData,
    );
    return produtoAtualizado;
  }

  async deletarProduto(produtoId: string): Promise<boolean> {
    try {
      await this.repositorioProdutos.deletarProduto(produtoId);
      return true;
    } catch (err) {
      return false;
    }
  }

  async todosProdutos(): Promise<MeuProduto[]> {
    return await this.repositorioProdutos.buscarTodosProdutos();
  }

  async produtoPorId(id: string): Promise<MeuProduto> {
    const produtoEncontrado = await this.repositorioProdutos.buscarProdutoPorId(
      id,
    );
    return produtoEncontrado;
  }
}
