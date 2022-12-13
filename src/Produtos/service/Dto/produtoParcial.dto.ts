import { PartialType } from "@nestjs/swagger";
import { ProdutosDto } from "./produtos.dto";


export class ProdutoParcialDto extends PartialType(ProdutosDto){
  id:string
}

export class AtualizarProdutosDto extends PartialType(ProdutosDto){}