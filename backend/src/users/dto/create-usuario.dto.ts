//DTO para crear un usuario

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RolUsuario } from "src/entities/usuario.entity";

export class CreateUsuarioDto {
    // Nombre completo del usuario (no puede estar vacío)
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre_completo: string;

    // Email del usuario (debe ser un email válido)
    @ApiProperty()
    @IsEmail()
    email: string;

    // Contraseña del usuario (no puede estar vacío)
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    contrasena: string;

    // Rol del usuario (debe ser 'estudiante' o 'profesor')
    @ApiProperty()
    @IsEnum(RolUsuario)
    rol: RolUsuario
}