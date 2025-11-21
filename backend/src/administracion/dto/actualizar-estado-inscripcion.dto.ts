//DTO para actualizar el estado de la inscripcion
import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";
import { EstadoInscripcion } from "src/entities/inscripcion.entity";

export class ActualizarEstadoInscropcionDto{
    //Inscripción a actualizar (id)
    @IsInt()
    @IsPositive()
    idInscripcion: number;

    //Actualiar nota
    @IsOptional()
    @IsNumber()
    nota?: number | null;

    //Estado inscripición
    @IsOptional()
    @IsEnum(EstadoInscripcion)
    estado?: EstadoInscripcion;
}