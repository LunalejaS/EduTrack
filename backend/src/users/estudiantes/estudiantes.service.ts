// Servicio para manejar la lógica de negocio relacionada con los estudiantes

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from 'src/entities/estudiante.entity';
import { Repository } from 'typeorm';
import { RolUsuario, Usuario } from 'src/entities/usuario.entity';

@Injectable()
export class EstudiantesService {
  // Inyección de dependencias de los repositorios necesarios
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  //Básicos CRUD
  //Crear un nuevo estudiante
  async create(createEstudianteDto: CreateEstudianteDto) {
    const { usuarioId, ano_ingreso } = createEstudianteDto;

    // Verificar si el usuario existe y es un estudiante
    const usuario = await this.usuarioRepository.findOne({ where: {id: usuarioId }});
    if (!usuario) {
      throw new NotFoundException(`El usuario con ID ${usuarioId} no existe.`);
    }
    if (usuario.rol !== RolUsuario.ESTUDIANTE) {
      throw new BadRequestException(`El usuario con ID ${usuarioId} no es un estudiante.`);
    }

    // Verificar si el estudiante ya está registrado
    const existenteEstudiante = await this.estudianteRepository.findOne({ where: { id: usuarioId }});
    if (existenteEstudiante) {
      throw new BadRequestException(`El estudiante con ID ${usuarioId} ya está registrado como estudiante.`);
    }

    // Crear y guardar el nuevo estudiante
    const nuevoEstudiante = this.estudianteRepository.create({
      id: usuarioId,
      ano_ingreso,
      usuario,
    });
    return await this.estudianteRepository.save(nuevoEstudiante);
  }

  // Obtener todos los estudiantes
  async findAll() {
    return await this.estudianteRepository.find({ relations: ['usuario', 'inscripciones'] });
  }

  // Obtener un estudiante por su ID
  async findOne(id: number) {
    const estudiante =  await this.estudianteRepository.findOne({
      where: { id },
      relations: ['usuario', 'inscripciones'],
    });
    if (!estudiante) {
      throw new NotFoundException(`El estudiante con ID ${id} no existe.`);
    }
    return estudiante;
  }

  // Actualizar un estudiante
  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.findOne(id);
    Object.assign(estudiante, updateEstudianteDto);
    return await this.estudianteRepository.save(estudiante);
  }

  // Eliminar un estudiante
  async remove(id: number) {
    const estudiante = await this.findOne(id);
    await this.estudianteRepository.remove(estudiante);
    return {message: `Estudiante con ID ${id} eliminado exitosamente`};
  }
}
