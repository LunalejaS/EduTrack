import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './users/usuarios.module';
import { AppDataSource } from './ormconfig';
import { CursosModule } from './cursos/cursos.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { AdministradorModule } from './administracion/administrador.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UsuariosModule,
    CursosModule,
    InscripcionesModule,
    AdministradorModule,
  ],
})
export class AppModule {}
