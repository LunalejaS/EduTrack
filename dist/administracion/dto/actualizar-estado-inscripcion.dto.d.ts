import { EstadoInscripcion } from "src/entities/inscripcion.entity";
export declare class ActualizarEstadoInscropcionDto {
    idInscripcion: number;
    nota?: number | null;
    estado?: EstadoInscripcion;
}
