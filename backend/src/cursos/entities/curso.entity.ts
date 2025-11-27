// Curso Entity

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profesor } from "src/users/entities/profesor.entity";
import { Inscripcion } from "src/inscripciones/entities/inscripcion.entity";
import { UpdateCursoDto } from "../dto/update-curso.dto";

@Entity()
export class Curso {
    // ID autogenerado
    @PrimaryGeneratedColumn()
    id: number;

    // Columna para el nombre del curso
    @Column( { type: 'varchar', length: 255 })
    nombre: string;

    // Columna para la descripción del curso
    @Column( { type: 'text', nullable: true })
    descripcion: string;

    //ID profesor asignado
    @Column({ name: 'profesor_id'})
    profesor_id: number;

    // Columna para fecha de inicio del curso
    @Column({ type: 'date' })
    fecha_inicio: Date;

    //Columna para fecha de finalización del curso
    @Column({ type:'date'})
    fecha_fin: Date;

    /*
    Información Adicional
    */
    //Fecha de creación
    @CreateDateColumn()
    creado_en: Date;

    //Decha de actualización
    @UpdateDateColumn()
    actualizado_en: Date;

    /*
    RELACIONES
    */

    //Relación muchos a uno con la entidad Profesor
    @ManyToOne(() => Profesor, (profesor) => profesor.cursos, {eager: true})
    @JoinColumn({ name: 'profesor_id'})
    profesor: Profesor;

    //Relación uno a muchos con la entidad Inscripcion
    @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.curso)
    inscripciones: Inscripcion[];
}