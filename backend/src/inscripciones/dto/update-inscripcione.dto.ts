//DTO para actualizar una inscripción

import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcioneDto } from './create-inscripcione.dto';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { EstadoInscripcion } from 'src/enums/estado-inscripcion.enum';

export class UpdateInscripcioneDto extends PartialType(CreateInscripcioneDto) {
    // Estado de la inscripción
    @IsOptional()
    @IsEnum(EstadoInscripcion)
    estado?: EstadoInscripcion;

    //Nota del estudiante
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    nota?: number;
}
