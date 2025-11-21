// Servicio para manejar la lógica de negocio relacionada con los profesores

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profesor } from "src/entities/profesor.entity";
import { RolUsuario, Usuario } from "src/entities/usuario.entity";
import { Repository } from "typeorm";
import { CreateProfesoreDto } from "./dto/create-profesore.dto";
import { UpdateProfesoreDto } from "./dto/update-profesore.dto";

@Injectable()
export class ProfesoresService {
  // Inyectamos los repositorios necesarios
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // CRUD básico
  // Crear un nuevo profesor
  async create(createProfesorDto: CreateProfesoreDto) {
    const { usuarioId, especialidad } = createProfesorDto;

    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(`El usuario con id ${usuarioId} no existe`);
    }
    if (usuario.rol !== RolUsuario.PROFESOR) {
      throw new BadRequestException(`El usuario con id ${usuarioId} no es un profesor`);
    }

    const yaExisteProfesor = await this.profesorRepository.findOne({
      where: { id: usuarioId },
    });
    if (yaExisteProfesor) {
      throw new BadRequestException(`El profesor con id ${usuarioId} ya esta registrado como profesor`);
    }

    const nuevoProfesor = this.profesorRepository.create({
      id: usuarioId,
      especialidad,
      usuario,
    });

    return await this.profesorRepository.save(nuevoProfesor);
  }

  // Obtener todos los profesores
  async findAll() {
    return await this.profesorRepository.find({
      relations: ['usuario', 'cursos'],
    });
  } 

  // Obtener un profesor por su ID
  async findOne(id: number) {
    const profesor = await this.profesorRepository.findOne({
      where: { id },
      relations: ['usuario', 'cursos'],
    });
    if (!profesor) {
      throw new NotFoundException(`Profesor con id ${id} no existe`);
    }
    return profesor;
  }

  // Actualizar la información de un profesor
  async update(id: number, updateProfesorDto: UpdateProfesoreDto) {
    const profesor = await this.profesorRepository.findOneBy({ id });
    if (!profesor) {
      throw new NotFoundException(`Profesor con id ${id} no existe`);
    }
    Object.assign(profesor, updateProfesorDto);
    return this.profesorRepository.save(profesor);
  }

  // Eliminar un profesor
  async remove(id: number) {
    const profesor = await this.findOne(id);
    await this.profesorRepository.remove(profesor);
    return { message: `Profesor con id ${id} eliminado correctamente` };
  }
}