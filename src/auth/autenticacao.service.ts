import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/Usuario/service/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioLoginDto } from './dto/loginUsuario.dto';
import { compare } from 'bcrypt';
import { Execao } from 'src/utils/execoes/execoes';
import { Execoes } from 'src/utils/execoes/execoesDeAjuda';
import { MeuUsuario } from 'src/Usuario/entities/usuario.entity';

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async ValidarUsuario({ email, senha }: UsuarioLoginDto) {
    const usuario = await this.usuarioService.findUserByEmail(email);

    const senhaValida = await compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Execao(Execoes.UnauthorizedException, 'Senha invalida');
    }

    delete usuario.senha;

    return {
      token: this.jwtService.sign({
        email: usuario.email,
        id: usuario.id,
        nome: usuario.nome,
        role: usuario.role,
      }),
      usuario,
    };
  }

  async getUser(email: string): Promise<MeuUsuario> {
    const usuario = await this.usuarioService.findUserByEmail(email);
    return usuario;
  }
}
