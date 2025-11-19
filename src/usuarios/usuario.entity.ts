//Creación de la entidad Usuario (Profesor o estudiante)

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity() 
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
        enum: ['estudiante', 'profesor'],
        }
    )
    rol: 'estudiante' | 'profesor';
}