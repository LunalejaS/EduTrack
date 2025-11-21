//DTO para crear un nuevo estudiante
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateEstudianteDto {
    // ID del usuario asociado al estudiante
    @ApiProperty()
    @IsInt()
    @Min(1)
    usuarioId: number;

    // Año de ingreso del estudiante
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ano_ingreso: string;
}