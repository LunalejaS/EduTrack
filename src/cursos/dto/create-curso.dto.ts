//DTO para crear un nuevo curso

import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCursoDto {
    // Nombre del curso (no puede estar vacío)
    @IsString()
    @IsNotEmpty()
    nombre_curso: string;

    // Descripción del curso (no puede estar vacío)
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    // Duración del curso en horas (debe ser un entero)
    @IsInt()
    duracion_horas: number;

    // ID del profesor que imparte el curso (debe ser un entero)
    @IsInt()
    profesorId: number;    
}