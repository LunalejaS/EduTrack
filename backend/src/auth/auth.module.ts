//Módulo de Autenticación

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/users/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsuariosModule,
    ConfigModule,
    PassportModule,
    //Configuración del JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      //Configuración clave secreta y tiempo de expiración
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h'},
      }),
    }),
  ],
})
export class AuthModule {}