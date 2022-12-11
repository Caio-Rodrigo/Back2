import { Execoes } from './execoesDeAjuda';

export class Execao {
  constructor(readonly execao: Execoes, readonly message?: string) {}
}
