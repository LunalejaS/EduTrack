import { Usuario } from "./usuario.entity";
import { Inscripcion } from "./inscripcion.entity";
export declare class Estudiante {
    id: number;
    usuario: Usuario;
    ano_ingreso: string;
    inscripciones: Inscripcion[];
}
