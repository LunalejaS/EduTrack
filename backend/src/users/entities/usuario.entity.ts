//Usuario entity

import { Exclude } from "class-transformer";
import { RolUsuario } from "src/enums/rol-usuario.enum";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Profesor } from "./profesor.entity";

@Entity('usuario') 
export class Usuario {
    //ID autogenerado
    @PrimaryGeneratedColumn() 
    id: number;

    //Nombre completo del usuario
    @Column({ type: 'varchar', length: 225})
    nombre_completo: string;

    //Email único
    @Column({ unique: true, type: 'varchar', length: 300}) 
    email: string;

    //Contraseña (hasheada)
    @Column({ type: 'varchar', length: 100, select: false})
    @Exclude()
    contrasena: string;

    //Rol de Usuario
    @Column(
        { 
        type:'enum',
        enum: RolUsuario,
        default: RolUsuario.ESTUDIANTE,
        }
    )
    rol: RolUsuario;

    /* 
    Información adicional
    */

   //Fecha de creación
   @CreateDateColumn()
   creado_en: Date;

   //Fecha de Actualización
   @UpdateDateColumn()
   actualizado_en: Date;

   /*
    RELACIONES
   */

    //Relación uno a uno con Estudiante
    @OneToOne(() => Estudiante, (estudiante) => estudiante.usuario)
    estudiante: Estudiante;

    //Relación uno a uno con Profesor
    @OneToOne(() => Profesor, (profesor) => profesor.usuario)
    profesor: Profesor;
}