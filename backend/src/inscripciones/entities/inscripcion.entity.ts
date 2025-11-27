// Inscripción Entity

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Estudiante } from "src/users/entities/estudiante.entity";
import { Curso } from "src/cursos/entities/curso.entity";
import { EstadoInscripcion } from "src/enums/estado-inscripcion.enum";

@Entity()
export class Inscripcion {
    // ID autogenerado
    @PrimaryGeneratedColumn()
    id: number;

    // ID del estudiante
    @Column({ name: 'estudiante_id'})
    estudiante_id: number;

    // ID del curso
    @Column({ name: 'curso_id'})
    curso_id: number;

    //Columna para el estado que puede tener la inscripción
    @Column({
        type: 'enum',
        enum: EstadoInscripcion,
        default: EstadoInscripcion.PENDIENTE
    })
    estado: EstadoInscripcion;

    //Nota del Estudiante
    @Column({ type: 'float', nullable: true})
    nota: number | null;

    /*
    Información Adicional
    */
    //Fecha de inscripción
    @CreateDateColumn()
    creado_en: Date;

    //Fecha de Actualización
    @UpdateDateColumn()
    actualizado_en: Date;

    //Relación muchos a uno con la entidad Estudiante
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.inscripciones, { eager: true })
    @JoinColumn({ name: 'estudiante_id'})
    estudiante: Estudiante;

    //Relación muchos a uno con la entidad Curso
    @ManyToOne(() => Curso, (curso) => curso.inscripciones, { eager: true })
    @JoinColumn({ name: 'curso_id'})
    curso: Curso;
}