//Servicio para gestionar las operaciones relacionadas con los cursos

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from 'src/entities/curso.entity';
import { In, Repository } from 'typeorm';
import { Profesor } from 'src/entities/profesor.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CursosService {
  // Inyección de dependencias de los repositorios necesarios
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,

    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Curso>,
  ) {}

  // CRUD básico
  // Crear un nuevo curso
  async create(createCursoDto: CreateCursoDto) {
    const { nombre, descripcion, duracion_horas, profesorId } = createCursoDto;

    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId } });7
    if (!profesor) {
      throw new NotFoundException(`El profesor con ID ${profesorId} no existe.`);
    }

    const nuevoCurso = this.cursoRepository.create({
      nombre,
      descripcion,
      duracion_horas,
      profesor,
    });
    return await this.cursoRepository.save(nuevoCurso);
  }

  // Obtener todos los cursos
  async findAll() {
    return await this.cursoRepository.find({ relations: ['profesor', 'inscripciones'] });
  }

  // Obtener un curso por su ID
  async findOne(id: number) {
    const curso = await this.cursoRepository.findOne({
      where: { id },
      relations: ['profesor', 'inscripciones'],
    });
    if (!curso) {
      throw new NotFoundException(`El curso con ID ${id} no existe.`);
    }

    return curso;
  }

  // Actualizar un curso
  async update(id: number, updateCursoDto: UpdateCursoDto) {
    const curso = await this.findOne(id);
    Object.assign(curso, updateCursoDto);
    return await this.cursoRepository.save(curso);
  }

  // Eliminar un curso
  async remove(id: number) {
    const curso = await this.findOne(id);
    await this.cursoRepository.remove(curso);
    return { message: `El curso con ID ${id} ha sido eliminado.` };
  }
}
