//DTO para actualizar el estado de la inscripcion
import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";
import { EstadoInscripcion } from "src/enums/estado-inscripcion.enum";


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
    @IsEnum(EstadoInscripcion, { message: 'estado no válido' })
    estado?: EstadoInscripcion;
}