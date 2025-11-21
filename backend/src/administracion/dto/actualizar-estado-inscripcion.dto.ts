//DTO para actualizar el estado de la inscripcion
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export enum EstadoInscripcion {
    PENDIENTE = 'pendiente',
    APROBADA = 'aprobado',
    RECHAZADA = 'rechazado',
}

export class ActualizarEstadoInscropcionDto{
    //Inscripción a actualizar (id)
    @ApiProperty()
    @IsInt()
    @IsPositive()
    idInscripcion: number;

    //Actualiar nota
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    nota?: number | null;

    //Estado inscripición
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(EstadoInscripcion, { message: 'estado no válido' })
    estado?: EstadoInscripcion;
}