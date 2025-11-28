// Estudiantes Servicio

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class EstudiantesService {
    // Inyección de Dependencias
    constructor(
        @InjectRepository(Estudiante)
        private readonly estudiantesRepository: Repository<Estudiante>,
    ){}

    //Crear estudiante
    async create(data: { usuario: Usuario; ano_ingreso: number }) {
    const estudiante = this.estudiantesRepository.create({
        id: data.usuario.id,           // << OBLIGATORIO
        usuario: data.usuario,
        ano_ingreso: data.ano_ingreso,
    });

    return await this.estudiantesRepository.save(estudiante);
    }

    //Buscar estudiante por ID
    async findByID(id: number){
        return await this.estudiantesRepository.findOne({ where: {id}, relations: ['usuario', 'inscripciones']});
    }

    // Eliminar estudiante por ID
    async removeByUserId(userId: number) {
    const estudiante = await this.estudiantesRepository.findOne({
        where: { usuario: { id: userId } },
        relations: ['usuario'],
    });

    if (!estudiante) {
        throw new NotFoundException(`El estudiante con usuario ID ${userId} no fue encontrado.`);
    }

    return this.estudiantesRepository.remove(estudiante);
}
}
