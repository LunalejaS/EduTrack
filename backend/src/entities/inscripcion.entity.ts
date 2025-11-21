//Definición de la entidad Inscripcion

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Curso } from "./curso.entity";

//Definición de estados posibles de la inscripción
export enum EstadoInscripcion {
    PENDIENTE='pendiente',
    APROBADO='aprobado',
    REPROBADO='reprobado'
}

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

    //Columna para el estado que puede tener la inscripción
    @Column({
        type: 'enum',
        enum: EstadoInscripcion,
        default: EstadoInscripcion.PENDIENTE,
    })
    estado: EstadoInscripcion;

    //Relación muchos a uno con la entidad Estudiante
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.inscripciones, { nullable: false })
    estudiante: Estudiante;

    //Relación muchos a uno con la entidad Curso
    @ManyToOne(() => Curso, (curso) => curso.inscripciones, { nullable: false })
    curso: Curso;
}