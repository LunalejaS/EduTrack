//Controlador Administrador

import { Body, Controller, Patch, Query } from "@nestjs/common";
import { AdministradorService } from "./administrador.service";
import { AsignarCursoDto } from "./dto/asignar-curso.dto";
import { ActualizarEstadoInscropcionDto } from "./dto/actualizar-estado-inscripcion.dto";

@Controller('admin')
export class AdministradorController {
    constructor(
        private readonly administradorService: AdministradorService,
    ){}

    //Asignar profesor a curso
    @Patch('asignar-curso')
    asignarCurso(
        @Query('email') email: string,
        @Body() asignarCursoDto: AsignarCursoDto, 
    ){
        return this.administradorService.asignarCurso(email, asignarCursoDto)
    }

    //Actualizar nota o estado de inscripción
    @Patch('inscripciones/estado')
    actualizarEstadoInscripcion(
        @Query('email') email: string,
        @Body() asignarCursoDto: ActualizarEstadoInscropcionDto,
    ){
        return this.administradorService.actualizarEstadoInscripcion(email, asignarCursoDto);
    }

}