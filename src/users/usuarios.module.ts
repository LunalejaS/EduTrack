//Modulo de usuarios
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Profesor } from 'src/entities/profesor.entity';
import { Estudiante } from 'src/entities/estudiante.entity';

@Module({
  //Importamos el controlador y el servicio de usuarios
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [TypeOrmModule.forFeature([Usuario, Profesor, Estudiante])], //Importamos la entidad Usuario
})
export class UsuariosModule {}
