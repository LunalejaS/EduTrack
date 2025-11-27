//DTO para crear una nueva inscripción

import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreateInscripcioneDto {
    //ID del estudiante que se inscribe
    @IsNotEmpty()
    @IsInt()
    curso_id: number;
}
