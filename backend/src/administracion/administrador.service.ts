//Servicio Administrador

import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Curso } from "src/cursos/entities/curso.entity";
import { Inscripcion } from "src/inscripciones/entities/inscripcion.entity";
import { Profesor } from "src/users/entities/profesor.entity";
import { Usuario } from "src/users/entities/usuario.entity";
import { Repository } from "typeorm";
import { esEmailAceptadoAdmin } from "./config/admin-emails.config";
import { AsignarCursoDto } from "./dto/asignar-curso.dto";
import { ActualizarEstadoInscropcionDto } from "./dto/actualizar-estado-inscripcion.dto";

@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        @InjectRepository(Curso)
        private readonly cursoRepository: Repository<Curso>,
        
        @InjectRepository(Profesor)
        private readonly profesorRepository: Repository<Profesor>,
        
        @InjectRepository(Inscripcion)
        private readonly inscripcionRepository: Repository<Inscripcion>,
    ){}

    //Validación de permisos
    private validacionAdmin(email: string){
        if(!email || !esEmailAceptadoAdmin(email)){
            throw new ForbiddenException('No tienes permisos de Administrador')
        }
    }

    //Asignar profesor a curso
    async asignarCurso(adminEmail: string, asignarCursoDto: AsignarCursoDto){
        this.validacionAdmin(adminEmail);

        const profesor = await this.profesorRepository.findOne({ where: { id: asignarCursoDto.idProfesor}});
        if(!profesor){
            throw new NotFoundException(`Profesor con el ID ${asignarCursoDto.idProfesor} no encontrado.`)
        }

        const curso = await this.cursoRepository.findOne({ where: { id: asignarCursoDto.idCurso}});
        if(!curso){
            throw new NotFoundException(`Curso con el ID ${asignarCursoDto.idCurso} no encontrado.`)
        }

        curso.profesor = profesor;

        return this.cursoRepository.save(curso);
    }

    //Actualizar nota o estado de la inscripción
    async actualizarEstadoInscripcion(
        adminEmail: string,
        actualizarEstadoInscripcionDto: ActualizarEstadoInscropcionDto,
    ) {
        this.validacionAdmin(adminEmail);

        const inscripcion = await this.inscripcionRepository.findOne({ where: { id: actualizarEstadoInscripcionDto.idInscripcion}});
        if(!inscripcion){
            throw new NotFoundException(`Inscripción con el ID ${actualizarEstadoInscripcionDto.idInscripcion} no encontrada.`);
        }

        //Actualizar unicamente la información que venga
        if(actualizarEstadoInscripcionDto.nota !== undefined){
            inscripcion.nota = actualizarEstadoInscripcionDto.nota;
        }
        if(actualizarEstadoInscripcionDto.estado !== undefined){
            inscripcion.estado = actualizarEstadoInscripcionDto.estado;
        }
        return this.inscripcionRepository.save(inscripcion);
    }
}
