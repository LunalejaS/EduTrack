// Profesores Servicio

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { MateriasProfesor } from 'src/enums/materia-profesor.enum';

@Injectable()
export class ProfesoresService {
    // Inyección de dependencias
    constructor(
        @InjectRepository(Profesor)
        private readonly profesoresRepository: Repository<Profesor>,
    ){}

    //Crear Profesor
    async create(data: { usuario: Usuario; especialidad: MateriasProfesor }) {
        const profesor = this.profesoresRepository.create({
            id: data.usuario.id,         // <- MUY IMPORTANTE
            usuario: data.usuario,
            especialidad: data.especialidad,
        });

        return await this.profesoresRepository.save(profesor);
    }

    //Buscar profesores por ID
    async findById(id: number){
        return await this.profesoresRepository.findOne({ where: {id}, relations: ['usuario', 'cursos']});
    }

    // Eliminar Profesor por ID
    async removeByUserId(userId: number) {
    const profesor = await this.profesoresRepository.findOne({
        where: { usuario: { id: userId } },
        relations: ['usuario'],
    });
    if (!profesor) {
        throw new NotFoundException(`El profesor con usuario ID ${userId} no fue encontrado.`);
    }

    await this.profesoresRepository.remove(profesor);
    return {
        message: "Profesor Eliminado con éxito."
    }
}
}
