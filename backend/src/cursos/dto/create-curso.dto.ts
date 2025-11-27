//DTO para la creación de un nuevo curso
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

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
    @ApiProperty()
    @IsInt()
    @Min(1)
    profesorId: number;
}
