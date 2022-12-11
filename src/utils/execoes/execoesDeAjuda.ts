import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Execao } from './MinhasExecoes';

export enum Execoes {
  InvalidData,
  DatabaseException,
  NotFoundData,
  UnauthorizedException,
}

export function TratarExecao({ message, execao }: Execao) {
  if (execao === Execoes.InvalidData || execao === Execoes.NotFoundData) {
    throw new BadRequestException(message ? message : 'Invalid data');
  }
  if (execao === Execoes.DatabaseException) {
    throw new InternalServerErrorException(
      message ? message : 'Erro no banco de dados',
    );
  }
  if (execao === Execoes.UnauthorizedException) {
    throw new UnauthorizedException(
      message ? message : 'Você não tem permissão para fazer esta ação',
    );
  }
}
