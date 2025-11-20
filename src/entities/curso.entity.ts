// Definición de la entidad Curso

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profesor } from "./profesor.entity";
import { Inscripcion } from "./inscripcion.entity";

@Entity()
export class Curso {
    // Columna de clave primaria auto-generada
    @PrimaryGeneratedColumn()
    id: number;

    // Columna para el nombre del curso
    @Column()
    nombre: string;

    // Columna para la descripción del curso
    @Column()
    descripcion: string;

    // Columna para la duración del curso en horas
    @Column()
    duracion_horas: number;

    //Relación muchos a uno con la entidad Profesor
    @ManyToOne(() => Profesor, (profesor) => profesor.cursos, {nullable: false})
    profesor: Profesor;

    //Relación uno a muchos con la entidad Inscripcion
    @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.curso)
    inscripciones: Inscripcion[];
}