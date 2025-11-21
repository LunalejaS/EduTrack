//DTO para la creación de un nuevo curso
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateCursoDto {
    // Nombre del curso
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    // Descripción del curso
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    // Duración del curso en horas
    @ApiProperty()
    @IsInt()
    @Min(1)
    duracion_horas: number;

    // ID del profesor que imparte el curso
    @ApiProperty()
    @IsInt()
    @Min(1)
    profesorId: number;
}
