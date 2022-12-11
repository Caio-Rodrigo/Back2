import { Body, Controller, Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AutenticacaoService } from './autenticacao.service';
import { UsuarioLoginDto } from './dto/loginUsuario.dto';
import { TratarExecao } from '../utils/execoes/execoesDeAjuda';
import { AutorizacaoEComerce } from './decorators/e-comerce.decorator';
import { UsuarioLogado } from './decorators/usuario-logado.decorator';
import { MeuUsuario } from 'src/Usuario/entities/usuario.entity';

@Controller('Autorização')
@ApiTags('Autorização')
export class AuthController {
  constructor(private readonly authService: AutenticacaoService) {}

  @Post('login')
  async login(@Body() data: UsuarioLoginDto) {
    try {
      return await this.authService.ValidarUsuario(data);
    } catch (error) {
      TratarExecao(error);
    }
  }

  @Get()
  @UseGuards(AuthGuard(), AutorizacaoEComerce)
  @ApiBearerAuth()
  async getUser(@UsuarioLogado() usuario: MeuUsuario) {
    return usuario;
  }
}
