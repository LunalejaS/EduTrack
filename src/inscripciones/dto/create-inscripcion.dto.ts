//DTO para crear una nueva inscripción

import { IsDateString, IsInt, IsOptional } from "class-validator";


export class CreateInscripcionDto {
    //  Fecha de inscripción (debe ser una cadena de fecha válida)
    @IsDateString()
    fecha_inscripcion: string;

    // Nota obtenida (opcional, debe ser un entero si se proporciona)
    @IsOptional()
    @IsInt()
    nota?: number;

    // ID del estudiante que se inscribe (debe ser un entero)
    @IsInt()
    estudianteId: number;

    // ID del curso al que se inscribe (debe ser un entero)
    @IsInt()
    cursoId: number;
}