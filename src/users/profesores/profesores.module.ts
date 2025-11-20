//Definición del módulo Profesores

import { Module } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { ProfesoresController } from './profesores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from 'src/entities/profesor.entity';
import { Usuario } from 'src/entities/usuario.entity';

// Módulo para manejar la funcionalidad relacionada con los profesores
@Module({
  // Importamos el controlador y el servicio de profesores, así como la entidad Profesor 
  controllers: [ProfesoresController],
  providers: [ProfesoresService],
  imports: [TypeOrmModule.forFeature([Profesor, Usuario])],
})
export class ProfesoresModule {}
