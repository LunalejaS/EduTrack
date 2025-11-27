// Cursos Service

import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from 'src/cursos/entities/curso.entity';
import { Repository } from 'typeorm';
import { Profesor } from 'src/users/entities/profesor.entity';

@Injectable()
export class CursosService {
  // Inyección de dependencias de los repositorios necesarios
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,

    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  // Crear un nuevo curso
  async create(createCursoDto: CreateCursoDto) {
    const { nombre, descripcion, fecha_inicio, fecha_fin, profesorId } = createCursoDto;
    
    // Verificar que el profesor existe
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId } });7
    if (!profesor) {
      throw new NotFoundException(`El profesor con ID ${profesorId} no existe.`);
    }

    // Validar que fecha_fin sea posterior a fecha_inicio
    const fechaInicio = new Date(fecha_inicio);
    const fechaFin = new Date(fecha_fin);

    if (fechaFin <= fechaInicio){
      throw new BadRequestException(" La fecha de fin debe ser posterior a la fecha de inicio.")
    }

    // Crear el nuevo curso
    const nuevoCurso = this.cursoRepository.create({
      nombre,
      descripcion,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      profesor,
    });

    return await this.cursoRepository.save(nuevoCurso);
  }

  // Obtener todos los cursos
  async findAll() {
    return await this.cursoRepository.find({ relations: ['profesor', 'profesor.usuario', 'inscripciones'] });
  }

  // Obtener un curso por su ID
  async findOne(id: number) {
    const curso = await this.cursoRepository.findOne({
      where: { id },
      relations: ['profesor', 'inscripciones', 'profesor.usuario'],
    });
    if (!curso) {
      throw new NotFoundException(`El curso con ID ${id} no existe.`);
    }

    return curso;
  }

  // Actualizar un curso
  async update(id: number, updateCursoDto: UpdateCursoDto, profesorId?: number) {
    const curso = await this.findOne(id);

    // Si es profesor, verifica que sea su curso
    if(profesorId && curso.profesor_id !== profesorId){
      throw new ForbiddenException( " Solo puedes editar tus propios cursos.")
    }
    
    //Si se actualizan las fechas validar
    if(updateCursoDto.fecha_inicio || updateCursoDto.fecha_fin){
      const fechaInicio = updateCursoDto.fecha_inicio ? new Date(updateCursoDto.fecha_inicio) : curso.fecha_inicio;
      const fechaFin = updateCursoDto.fecha_fin ? new Date(updateCursoDto.fecha_fin) : curso.fecha_fin;

      if(fechaFin <= fechaInicio){
        throw new BadRequestException(" La fecha de fin debe ser posteriror a la fecha de inicio.")
      }

      //Asignar las fechas convertidas
      if(updateCursoDto.fecha_inicio){
        updateCursoDto.fecha_inicio = fechaInicio;
      }
      if (updateCursoDto.fecha_fin){
        updateCursoDto.fecha_fin = fechaFin;
      }
    }

    // Si se actualiza el profesor, verifica que existe
    if (updateCursoDto.profesorId){
      const profesor = await this.profesorRepository.findOne({ where: { id: updateCursoDto.profesorId}});

      if (!profesor){
        throw new NotFoundException(` El profesor con ID ${updateCursoDto.profesorId} no existe.`)
      }
    }

    //Actualizar el curso
    Object.assign(curso, updateCursoDto);
    return await this.cursoRepository.save(curso);
  }

  // Eliminar un curso
  async remove(id: number) {
    const curso = await this.findOne(id);
    await this.cursoRepository.remove(curso);
    return { message: `El curso con ID ${id} ha sido eliminado.` };
  }

  /*
  Métodos adicionales
  */
  //Obtener cursos de un profesor específico
  async findCursosByProfesor(profesorId: number){
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId}});
    if(!profesor){
      throw new NotFoundException(` Profesor con ${profesorId} no encontrado.`);
    }

    return await this.cursoRepository.find({ where: { profesor: { id: profesorId }}, relations: ['profesor', 'inscripciones', 'profesor.usuario'], order: { fecha_inicio: 'DESC'}});
  }

  //Obtener cursos activos
  async findCursosActivos() {
    const hoy = new Date();
    return await this.cursoRepository
      .createQueryBuilder('curso')
      .leftJoinAndSelect('curso.profesor', 'profesor')
      .leftJoinAndSelect('curso.inscripciones', 'inscripciones')
      .where('curso.fecha_inicio <= :hoy', { hoy })
      .andWhere('curso.fecha_fin >= :hoy', { hoy })
      .getMany();
  }

  //Asignar o cambiar profesor a un curso
  async asignarProfesor(cursoId: number, profesorId: number) {
    const curso = await this.findOne(cursoId);
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }});
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${profesorId} no encontrado.`);
    }
    curso.profesor_id = profesorId;

    await this.cursoRepository.save(curso);

    return {
      message: 'Profesor asignado al curso con éxito.',
      curso,
    };
  }

  //Obtener estudiantes inscritos en un curso con su estado
  async getEstudiantesInscritos(cursoId: number, profesorId?: number) {
    const curso = await this.findOne(cursoId);

    if (profesorId && curso.profesor_id !== profesorId) {
      throw new ForbiddenException('Solo puedes ver estudiantes de tus propios cursos.');
    }

    const cursoConInscripciones = await this.cursoRepository
      .createQueryBuilder('curso')
      .leftJoinAndSelect('curso.inscripciones', 'inscripciones')
      .leftJoinAndSelect('inscripciones.estudiante', 'estudiante')
      .leftJoinAndSelect('estudiante.usuario', 'usuario')
      .where('curso.id = :cursoId', { cursoId })
      .getOne();

    if (!cursoConInscripciones) {
      throw new NotFoundException(`No se encontró información del curso con ID ${cursoId}.`);
    }

    return cursoConInscripciones;
  }
}
