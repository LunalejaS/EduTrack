import { Profesor } from "./profesor.entity";
import { Inscripcion } from "./inscripcion.entity";
export declare class Curso {
    id: number;
    nombre: string;
    descripcion: string;
    duracion_horas: number;
    profesor: Profesor;
    inscripciones: Inscripcion[];
    curso: Curso;
}
