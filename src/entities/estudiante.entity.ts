//Definición de la entidad Estudiante

import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Inscripcion } from "./inscripcion.entity";

@Entity('estudiante')
export class Estudiante {
    // Columna de clave primaria que referencia al usuario (id del Usuario)
    @PrimaryColumn()
    id: number;

    // Relación uno a uno con la entidad Usuario
    @OneToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: 'id'})
    usuario: Usuario;

    // Columna para el grado del estudiante
    @Column()
    ano_ingreso: string;

    //Relación uno a muchos con la entidad Inscripcion
    @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.estudiante)
    inscripciones: Inscripcion[];

}