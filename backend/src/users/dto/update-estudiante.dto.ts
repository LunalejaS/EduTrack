//DTO para actualizar la información del estudiante

import { IsDateString, IsOptional } from "class-validator";

export class UpdateEstudianteDto {
    //Año de ingreso del estudiante (opcional, debe ser una cadena de fecha válida)
    //Campo correspondinte unicamente a usuarios con rol ESTUDIANTE
    @IsOptional()
    @IsDateString()
    ano_ingreso?: string;
}