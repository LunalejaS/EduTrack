//DTO para la creación de un profesor

import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateProfesoreDto {
    // ID del usuario asociado al profesor
    @ApiProperty()
    @IsInt()
    @Min(1)
    usuarioId: number;

    // Especialidad del profesor
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    especialidad: string;
}
