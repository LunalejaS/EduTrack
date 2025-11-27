import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorService } from './administrador.service';
import { Usuario } from 'src/users/entities/usuario.entity'; 
import { Profesor } from '../users/entities/profesor.entity';
import { Curso } from 'src/cursos/entities/curso.entity';
import { Inscripcion } from '../inscripciones/entities/inscripcion.entity';
import { AdministradorController } from './administracion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Profesor,
      Curso,
      Inscripcion,
    ]),
  ],
  controllers: [AdministradorController],
  providers: [AdministradorService],
})
export class AdministradorModule {}
