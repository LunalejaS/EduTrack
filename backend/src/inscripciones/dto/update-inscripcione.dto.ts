//DTO para actualizar una inscripción

import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcioneDto } from './create-inscripcione.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInscripcioneDto extends PartialType(CreateInscripcioneDto) {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    nota?: number;  
}
