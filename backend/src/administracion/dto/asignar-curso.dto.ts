//DTO para que administrador asigne un profesor a un curso
import { IsPositive, IsInt } from "class-validator";

export class AsignarCursoDto {
    //Id curso a asiganr profesor
    @IsInt()
    @IsPositive()
    idCurso: number;

    //Profesor (id)
    @IsInt()
    @IsPositive()
    idProfesor: number;

}