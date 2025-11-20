//Servicio para manejar la logica de los cursos

import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from 'src/entities/curso.entity';
import { Profesor } from 'src/entities/profesor.entity';
import { Repository } from 'typeorm';
import { CreateCursoDto } from '../dto/create-curso.dto';

@Injectable()
export class CursosService {
    // Inyectamos los repositorios necesarios
    constructor(
        @InjectRepository(Curso)
        private readonly cursoRepository: Repository<Curso>,
        @InjectRepository(Profesor)
        private readonly profesorRepository: Repository<Profesor>,
    ) {}

    //CRUD basico
    //Crear un nuevo curso
    async create(createCursoDto: CreateCursoDto){
        // Extraer el profesorId del DTO
        const {profesorId, ...rest} = createCursoDto;
        // Verificar que el profesor existe
        const profesor = await this.profesorRepository.findOneBy({id: profesorId});
        if(!profesor){
            throw new BadRequestException('Profesor no encontrado');
        }

        // Crear y guardar el nuevo curso
        const nuevoCurso = this.cursoRepository.create({
            ...rest,
            profesor: profesor,
        });

        //  Guardar el curso en la base de datos
        return this.cursoRepository.save(nuevoCurso);
    }
    
       
}
