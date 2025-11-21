//DTO para actualizar la información del profesor

import { IsString, IsOptional } from "class-validator";

export class UpdateEstudianteDto {
    //Especialidad del profesor
    //Campo correspondinte unicamente a usuarios con rol PROFESOR
    @IsOptional()
    @IsString()
    especialidad?: string;
}