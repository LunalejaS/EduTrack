//Modulo Usuarios
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "src/users/entities/usuario.entity";
import { Estudiante } from "./entities/estudiante.entity";
import { Profesor } from "./entities/profesor.entity";
import { UsuariosService } from "./usuarios.service";
import { UsuariosController } from "./usuarios.controller";
import { EstudiantesService } from './estudiantes.service';
import { ProfesoresService } from './profesores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Estudiante, Profesor])],
  providers: [UsuariosService, EstudiantesService, ProfesoresService],
  controllers: [UsuariosController],
  exports: [UsuariosService, EstudiantesService, ProfesoresService],
})
export class UsuariosModule {}