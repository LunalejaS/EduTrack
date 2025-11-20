//Definición de la entidad Profesor

import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Curso } from "./curso.entity";

@Entity('profesor')
export class Profesor {
    // Columna de clave primaria que referencia al usuario (id del Usuario)
    @PrimaryColumn()
    id: number;

    // Relación uno a uno con la entidad Usuario
    @OneToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: 'id' })
    usuario: Usuario;

    // Columna para la especialidad del profesor
    @Column()
    especialidad: string;

    //Relación uno a muchos con la entidad Curso
    @OneToMany(() => Curso, (curso) => curso.profesor)
    cursos: Curso[];
}