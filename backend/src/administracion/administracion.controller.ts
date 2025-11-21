//Controlador Administrador

import { Body, Controller, Patch, Query } from "@nestjs/common";
import { AdministradorService } from "./administrador.service";
import { AsignarCursoDto } from "./dto/asignar-curso.dto";
import { ActualizarEstadoInscropcionDto } from "./dto/actualizar-estado-inscripcion.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Administración')
@Controller('admin')
export class AdministradorController {
    constructor(
        private readonly administradorService: AdministradorService,
    ){}

    //Asignar profesor a curso
    @ApiOperation({ summary: 'Asignar un curso a un profesor' })
    @ApiResponse({ status: 200, description: 'Curso asignado correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos o conflicto de asignación' })
    @ApiResponse({ status: 404, description: 'Profesor o curso no encontrado' })
    @Patch('asignar-curso')
    asignarCurso(
        @Query('email') email: string,
        @Body() asignarCursoDto: AsignarCursoDto, 
    ){
        return this.administradorService.asignarCurso(email, asignarCursoDto)
    }

    //Actualizar nota o estado de inscripción
    @ApiOperation({ summary: 'Actualizar el estado de una inscripción' })
    @ApiResponse({ status: 200, description: 'Estado actualizado correctamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
    @Patch('inscripciones/estado')
    actualizarEstadoInscripcion(
        @Query('email') email: string,
        @Body() asignarCursoDto: ActualizarEstadoInscropcionDto,
    ){
        return this.administradorService.actualizarEstadoInscripcion(email, asignarCursoDto);
    }

}