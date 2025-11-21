import { AdministradorService } from "./administrador.service";
import { AsignarCursoDto } from "./dto/asignar-curso.dto";
import { ActualizarEstadoInscropcionDto } from "./dto/actualizar-estado-inscripcion.dto";
export declare class AdministradorController {
    private readonly administradorService;
    constructor(administradorService: AdministradorService);
    asignarCurso(email: string, asignarCursoDto: AsignarCursoDto): Promise<import("../entities/curso.entity").Curso>;
    actualizarEstadoInscripcion(email: string, asignarCursoDto: ActualizarEstadoInscropcionDto): Promise<import("../entities/inscripcion.entity").Inscripcion>;
}
