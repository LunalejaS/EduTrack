//DTO para crear una nueva inscripción

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, Min } from "class-validator";

export class CreateInscripcioneDto {
    //ID del estudiante que se inscribe
    @ApiProperty()
    @IsInt()
    @Min(1)
    estudianteId: number;

    //ID del curso al que se inscribe
    @ApiProperty()
    @IsInt()
    @Min(1)
    cursoId: number;
    
    //Nota del estudiante en el curso (opcional)
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    nota?: number;
}
