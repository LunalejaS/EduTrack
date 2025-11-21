// DTO para actualizar la información de un profesor

import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesoreDto } from './create-profesore.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfesoreDto extends PartialType(CreateProfesoreDto) {
    // Especialidad del profesor (opcional)
    @IsOptional()
    @IsString()
    especialidad?: string;
}
