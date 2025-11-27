// Estudiante Entity

import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Inscripcion } from "src/inscripciones/entities/inscripcion.entity";

@Entity('estudiante')
export class Estudiante {
    // Clave que referencia al usuario
    @PrimaryColumn()
    id: number;

    // Relación uno a uno con la entidad Usuario
    @OneToOne(() => Usuario, (usuario) => usuario.estudiante, { eager: true })
    @JoinColumn({ name: 'id'})
    usuario: Usuario;

    // Año de ingreso del Estudiante
    @Column({ type: 'date'})
    ano_ingreso: string;

    //Relación uno a muchos con la entidad Inscripcion
    @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.estudiante)
    inscripciones: Inscripcion[];
}