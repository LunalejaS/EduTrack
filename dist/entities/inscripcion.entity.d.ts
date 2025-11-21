import { Estudiante } from "./estudiante.entity";
import { Curso } from "./curso.entity";
export declare enum EstadoInscripcion {
    PENDIENTE = "pendiente",
    APROBADO = "aprobado",
    REPROBADO = "reprobado"
}
export declare class Inscripcion {
    id: number;
    fecha_inscripcion: Date;
    nota: number | null;
    estado: EstadoInscripcion;
    estudiante: Estudiante;
    curso: Curso;
}
