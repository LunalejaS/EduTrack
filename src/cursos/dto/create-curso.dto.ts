//DTO para la creación de un nuevo curso
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateCursoDto {
    // Nombre del curso
    @IsString()
    @IsNotEmpty()
    nombre: string;

    // Descripción del curso
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    // Duración del curso en horas
    @IsInt()
    @Min(1)
    duracion_horas: number;

    // ID del profesor que imparte el curso
    @IsInt()
    @Min(1)
    profesorId: number;
}
