//Módulo de inscripciones

import { Module } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { Type } from 'class-transformer';
import { Curso } from 'src/entities/curso.entity';
import { Inscripcion } from 'src/inscripciones/entities/inscripcion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from 'src/entities/estudiante.entity';

@Module({
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
  imports: [TypeOrmModule.forFeature([Inscripcion, Curso, Estudiante])],
})
export class InscripcionesModule {}
