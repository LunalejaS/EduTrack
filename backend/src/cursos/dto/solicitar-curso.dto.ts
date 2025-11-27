//DTO para solicitar nuevo curso

import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SolicitarCursoDto {
    //Nombre del curso
    @IsNotEmpty()
    @IsString()
    nombre: string;

    //Descripción del curso
    @IsOptional()
    @IsString()
    descripcion?: string;

    //Fecha de inicio propuesta
    @IsNotEmpty()
    @IsDateString()
    fecha_inicio: string;

    //Fecha de fin propuesta
    @IsNotEmpty()
    @IsDateString()
    fecha_fin: string;

    //Justificación de la solicitud
    @IsOptional()
    @IsString()
    justificacion?: string;
}