import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { DatabasesModule } from 'src/prisma/database.module';
import { RepositorioUsuario } from 'src/Usuario/user.repository';
import { UsuarioService } from 'src/Usuario/service/usuario.service';
import { AuthController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { AuthStrategy } from './autenticacao.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    ConfigModule.forRoot(),
    DatabasesModule,
  ],
  controllers: [AuthController],
  providers: [
    AutenticacaoService,
    UsuarioService,
    RepositorioUsuario,
    AuthStrategy,
  ],
  exports: [AuthStrategy, AutenticacaoService],
})
export class AuthModule {}
