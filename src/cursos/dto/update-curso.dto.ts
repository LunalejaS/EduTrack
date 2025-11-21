//DTO para actualizar un curso existente

import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
    // Nombre del curso
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    nombre?: string;

    // Descripción del curso
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    descripcion?: string;

    // Duración del curso en horas
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Min(1)
    duracion_horas?: number;
}
