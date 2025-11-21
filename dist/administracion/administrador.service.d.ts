import { Curso } from "src/entities/curso.entity";
import { Inscripcion } from "src/entities/inscripcion.entity";
import { Profesor } from "src/entities/profesor.entity";
import { Usuario } from "src/entities/usuario.entity";
import { Repository } from "typeorm";
import { AsignarCursoDto } from "./dto/asignar-curso.dto";
import { ActualizarEstadoInscropcionDto } from "./dto/actualizar-estado-inscripcion.dto";
export declare class AdministradorService {
    private readonly usuarioRepository;
    private readonly cursoRepository;
    private readonly profesorRepository;
    private readonly inscripcionRepository;
    constructor(usuarioRepository: Repository<Usuario>, cursoRepository: Repository<Curso>, profesorRepository: Repository<Profesor>, inscripcionRepository: Repository<Inscripcion>);
    private validacionAdmin;
    asignarCurso(adminEmail: string, asignarCursoDto: AsignarCursoDto): Promise<Curso>;
    actualizarEstadoInscripcion(adminEmail: string, actualizarEstadoInscripcionDto: ActualizarEstadoInscropcionDto): Promise<Inscripcion>;
}
