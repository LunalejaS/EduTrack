//DTO para actualizar la información del profesor

import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateEstudianteDto {
    //Especialidad del profesor
    //Campo correspondinte unicamente a usuarios con rol PROFESOR
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    especialidad?: string;
}