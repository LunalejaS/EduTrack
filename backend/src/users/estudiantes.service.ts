// Estudiantes Servicio

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudiantesService {
    // Inyección de Dependencias
    constructor(
        @InjectRepository(Estudiante)
        private readonly estudiantesRepository: Repository<Estudiante>,
    ){}

    //Crear estudiante
    async create(data: { id: number; ano_ingreso: string}){
        const estudiante = this.estudiantesRepository.create(data);
        return await this.estudiantesRepository.save(estudiante);
    }

    //Buscar estudiante por ID
    async findByID(id: number){
        return await this.estudiantesRepository.findOne({ where: {id}, relations: ['usuario', 'inscripciones']});
    }
}
