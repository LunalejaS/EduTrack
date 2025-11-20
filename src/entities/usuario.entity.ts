//Creación de la entidad Usuario (Profesor o estudiante)

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// Definición de los roles posibles para el usuario
export enum RolUsuario {
    ESTUDIANTE = 'estudiante',
    PROFESOR = 'profesor',
}

// Definición de la entidad Usuario
@Entity('usuario') 
export class Usuario {
    // Columna de clave primaria auto-generada
    @PrimaryGeneratedColumn() 
    id: number;

     // Columna para el nombre completo
    @Column()
    nombre_completo: string;

    // Columna para el email (Debe ser único)
    @Column({ unique: true }) 
    email: string;

    // Columna para la contraseña
    @Column()
    contrasena: string;

    // Columna para el rol (estudiante o profesor)
    @Column(
        { 
        type:'enum',
        enum: RolUsuario,
        }
    )
    rol: RolUsuario;
}