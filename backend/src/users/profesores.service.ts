// Profesores Servicio

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';
import { MateriasProfesor } from 'src/enums/materia-profesor.enum';

@Injectable()
export class ProfesoresService {
    // Inyección de dependencias
    constructor(
        @InjectRepository(Profesor)
        private readonly profesoresRepository: Repository<Profesor>,
    ){}

    //Crear Profesor
    async create(data: { id: number; especialidad: MateriasProfesor}){
        const profesor = this.profesoresRepository.create(data);
        return await this.profesoresRepository.save(profesor);
    }

    //Buscar profesores por ID
    async findById(id: number){
        return await this.profesoresRepository.findOne({ where: {id}, relations: ['usuario', 'cursos']});
    }
}
