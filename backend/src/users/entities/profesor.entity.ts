// Profesor Entity

import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Curso } from "src/cursos/entities/curso.entity";
import { MateriasProfesor } from "src/enums/materia-profesor.enum";

@Entity('profesor')
export class Profesor {
    // Columna que referecia al Usuario
    @PrimaryColumn()
    id: number;

    // Relación uno a uno con la entidad Usuario
    @OneToOne(() => Usuario, (usuario) => usuario.profesor,{ eager: true })
    @JoinColumn({ name: 'id'})
    usuario: Usuario;

    // Columna para la especialidad del profesor
    @Column(
        {
            type: 'enum',
            enum: MateriasProfesor,
            default: MateriasProfesor.MATEMATICAS,
        }
    )
    especialidad: MateriasProfesor;
    
    //Relación uno a muchos con la entidad Curso
    @OneToMany(() => Curso, (curso) => curso.profesor)
    cursos: Curso[];
}