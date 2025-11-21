//DTO para actualizar una inscripción

import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcioneDto } from './create-inscripcione.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateInscripcioneDto extends PartialType(CreateInscripcioneDto) {
    @IsOptional()
    @IsNumber()
    nota?: number;  
}
