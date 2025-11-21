import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    ano_ingreso?: string;
}
