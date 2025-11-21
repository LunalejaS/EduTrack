//DTO para que administrador asigne un profesor a un curso
import { ApiProperty } from "@nestjs/swagger";
import { IsPositive, IsInt } from "class-validator";

export class AsignarCursoDto {
    //Id curso a asiganr profesor
    @ApiProperty({ example: 3})
    @IsInt()
    @IsPositive()
    idCurso: number;

    //Profesor (id)
    @IsInt()
    @IsPositive()
    idProfesor: number;

}