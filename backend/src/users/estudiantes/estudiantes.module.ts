import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from 'src/entities/estudiante.entity';
import { Usuario } from 'src/entities/usuario.entity';

@Module({
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  imports: [TypeOrmModule.forFeature([Estudiante, Usuario])],
})
export class EstudiantesModule {}
