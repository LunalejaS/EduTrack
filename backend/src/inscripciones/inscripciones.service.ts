//Servicio de inscripciones

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from 'src/entities/estudiante.entity';
import { In, Repository } from 'typeorm';
import { Inscripcion } from 'src/entities/inscripcion.entity';
import { Curso } from 'src/entities/curso.entity';

@Injectable()
export class InscripcionesService {
  //Inyección de dependencias de los repositorios necesarios
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,

    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  //Métodos CRUD básicos
  //Crear una nueva inscripción
  async create(createInscripcioneDto: CreateInscripcioneDto) {
    const { estudianteId, cursoId, nota } = createInscripcioneDto;

    const estudiante = await this.estudianteRepository.findOne({where: { id: estudianteId }});
    if(!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${estudianteId} no encontrado`);
    }

    const curso = await this.cursoRepository.findOne({where: { id: cursoId }});
    if(!curso) {
      throw new NotFoundException(`Curso con ID ${cursoId} no encontrado`);
    }

    const yaInscrito = await this.inscripcionRepository.findOne({where: { estudiante: { id: estudianteId }, curso: { id: cursoId } }});
    if(yaInscrito) {
      throw new NotFoundException(`El estudiante con ID ${estudianteId} ya está inscrito en el curso con ID ${cursoId}`);
    }

    const nuevaInscripcion = this.inscripcionRepository.create({
      estudiante,
      curso,
      nota: nota ?? null,
      fecha_inscripcion: new Date(),
    });
    return this.inscripcionRepository.save(nuevaInscripcion);
  }

  //Obtener todas las inscripciones
  async findAll() {
    return this.inscripcionRepository.find({
      relations: ['estudiante', 'curso'],
    });
  }

  //Obtener una inscripción por ID
  async findOne(id: number) {
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { id },
      relations: ['estudiante', 'curso'],
    });

    if (!inscripcion) {
      throw new NotFoundException(`Inscripción con ID ${id} no encontrada`);
    }

    return inscripcion;
  }

  //Actualizar una inscripción
  async update(id: number, dto: UpdateInscripcioneDto) {
    const insc = await this.inscripcionRepository.findOne({ where: { id } });
    if (!insc) throw new NotFoundException('Inscripción no encontrada');

    if (dto.nota !== undefined) insc.nota = dto.nota;

    return this.inscripcionRepository.save(insc);
  }

  //Eliminar una inscripción
  async remove(id: number) {
    const inscripcion = await this.findOne(id)
    await this.inscripcionRepository.remove(inscripcion);
    
    return { message: `Inscripción con ID ${id} cancelada correctamente.` };
  }
}
