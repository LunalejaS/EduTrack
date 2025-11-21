//DTO para actualizar el estado de la inscripcion
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";
import { EstadoInscripcion } from "src/entities/inscripcion.entity";

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
    @IsEnum(EstadoInscripcion)
    estado?: EstadoInscripcion;
}