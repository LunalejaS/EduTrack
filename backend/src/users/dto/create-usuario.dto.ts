import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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