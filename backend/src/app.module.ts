import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './users/usuarios.module';
import { AppDataSource } from './ormconfig';
import { CursosModule } from './cursos/cursos.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { AdministradorModule } from './administracion/administrador.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsuariosModule,
    CursosModule,
    InscripcionesModule,
    AdministradorModule,
    AuthModule,
  ],
})
export class AppModule {}
