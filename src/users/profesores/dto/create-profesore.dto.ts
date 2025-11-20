//DTO para la creación de un profesor

import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateProfesoreDto {
    // ID del usuario asociado al profesor
    @IsInt()
    @Min(1)
    usuarioId: number;

    // Especialidad del profesor
    @IsString()
    @IsNotEmpty()
    especialidad: string;
}
