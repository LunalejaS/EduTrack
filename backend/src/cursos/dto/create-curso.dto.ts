//DTO para la creación de un nuevo curso
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateCursoDto {
    // Nombre del curso
    @IsString()
    @IsNotEmpty()
    nombre: string;

    // Descripción del curso
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    // Fecha de inicio del curso
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    fecha_inicio: Date;

    // Fecha de fin del curso
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    fecha_fin: Date;

    // ID del profesor que imparte el curso
    @IsInt()
    @Min(1)
    profesorId: number;

    //Cupo maximo
    @IsInt()
    @Max(25)
    cupo_maximo: number;
}
