//DTO para crear un nuevo estudiante
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateEstudianteDto {
    // ID del usuario asociado al estudiante
    @IsInt()
    @Min(1)
    usuarioId: number;

    // Año de ingreso del estudiante
    @IsString()
    @IsNotEmpty()
    ano_ingreso: string;
}