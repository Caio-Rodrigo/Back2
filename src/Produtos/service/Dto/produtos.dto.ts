import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class ProdutosDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  produto:string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  cod: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  empresa:string;
}