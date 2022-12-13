import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabasesModule } from 'src/prisma/database.module';
import { ProdutosController } from './produtos.controller';
import { RepositorioDeProdutos } from './produtos.repository';
import { ProdutoService } from './service/produtos.service';

@Module({
  imports: [
    DatabasesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProdutosController],
  providers: [ProdutoService, RepositorioDeProdutos],
  exports: [ProdutoService],
})
export class ProdutoModule {}
