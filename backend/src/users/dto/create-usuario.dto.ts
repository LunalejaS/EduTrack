import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { RolUsuario } from "src/enums/rol-usuario.enum";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre_completo: string;

    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    contraseña: string;
}