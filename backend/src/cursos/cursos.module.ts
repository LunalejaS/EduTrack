import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Profesor } from 'src/users/entities/profesor.entity';
import { Estudiante } from 'src/users/entities/estudiante.entity';

@Module({
  controllers: [CursosController],
  providers: [CursosService],
  imports: [TypeOrmModule.forFeature([Curso, Profesor, Estudiante])],
})
export class CursosModule {}
