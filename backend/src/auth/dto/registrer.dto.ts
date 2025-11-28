// Registro DTO

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { MateriasProfesor } from "src/enums/materia-profesor.enum";

export class RegisterDto {
    // Nombre completo del usuario
    @IsString()
    @IsNotEmpty()
    nombre_completo: string;

    // Email del usuario 
    @IsEmail({ }, { message: " Debe ingresar un email válido."})
    email: string;

    // Contraseña del Usuario
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: " La contraseña debe tener como mínimo 6 caracteres."})
    contrasena: string;

    // Año de ingreso (Solo para estudiantes)
    @IsOptional()
    @IsString()
    ano_ingreso?: string;

    //Especialidad (Solo para Profesores)
    @IsOptional()
    @IsEnum(MateriasProfesor)
    especialidad: MateriasProfesor;

}