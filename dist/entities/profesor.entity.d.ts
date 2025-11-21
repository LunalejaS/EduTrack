import { Usuario } from "./usuario.entity";
import { Curso } from "./curso.entity";
export declare class Profesor {
    id: number;
    usuario: Usuario;
    especialidad: string;
    cursos: Curso[];
}
