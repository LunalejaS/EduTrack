//DTO para crear una nueva inscripción

import { IsInt, IsNumber, IsOptional, Min } from "class-validator";

export class CreateInscripcioneDto {
    //ID del estudiante que se inscribe
    @IsInt()
    @Min(1)
    estudianteId: number;

    //ID del curso al que se inscribe
    @IsInt()
    @Min(1)
    cursoId: number;
    
    //Nota del estudiante en el curso (opcional)
    @IsOptional()
    @IsNumber()
    nota?: number;
}
