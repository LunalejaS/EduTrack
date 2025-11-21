// DTO para actualizar la información de un profesor

import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesoreDto } from './create-profesore.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfesoreDto extends PartialType(CreateProfesoreDto) {
    // Especialidad del profesor (opcional)
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    especialidad?: string;
}
