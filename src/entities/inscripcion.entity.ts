//Definición de la entidad Inscripcion

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Curso } from "./curso.entity";

@Entity()
export class Inscripcion {
    // Columna de clave primaria auto-generada
    @PrimaryGeneratedColumn()
    id: number;

    // Columna para la fecha de inscripción
    @Column({ type: 'date' })
    fecha_inscripcion: Date;

    // Columna para la nota obtenida (puede ser nula si no se ha calificado)
    @Column({ type: 'float', nullable: true })
    nota: number | null;

    //Relación muchos a uno con la entidad Estudiante
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.inscripciones, { nullable: false })
    estudiante: Estudiante;

    //Relación muchos a uno con la entidad Curso
    @ManyToOne(() => Curso, (curso) => curso.inscripciones, { nullable: false })
    curso: Curso;
}