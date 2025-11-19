//DTO para crear un usuario

import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
    // Nombre completo del usuario (no puede estar vacío)
    @IsString()
    @IsNotEmpty()
    nombre_completo: string;

    // Email del usuario (debe ser un email válido)
    @IsEmail()
    email: string;

    // Contraseña del usuario (no puede estar vacío)
    @IsString()
    @IsNotEmpty()
    contrasena: string;

    // Rol del usuario (debe ser 'estudiante' o 'profesor')
    @IsEnum(['estudiante', 'profesor'])
    rol: 'estudiante' | 'profesor';
}