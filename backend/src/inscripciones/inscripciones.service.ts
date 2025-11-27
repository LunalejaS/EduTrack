//Servicio de inscripciones

import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcion } from 'src/inscripciones/entities/inscripcion.entity';
import { Estudiante } from 'src/users/entities/estudiante.entity';
import { Curso } from 'src/cursos/entities/curso.entity';
import { EstadoInscripcion } from 'src/enums/estado-inscripcion.enum';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';

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
  // Estudiante se inscribe a un curso
  async inscribirse(estudianteId: number, createInscripcionDto: CreateInscripcioneDto){
    const { curso_id } = createInscripcionDto;

    // Verificación de existencia del estudiante
    const estudiante = await this.estudianteRepository.findOne({ where: { id: estudianteId }});
    if(!estudiante){
      throw new NotFoundException(` Estudiante con ID ${estudianteId} no encontrado.`);
    }

    // Verificar que el curso existe
    const curso = await this.cursoRepository.findOne({ where: { id: curso_id }});
    if(!curso){
      throw new NotFoundException(` Curso con ID ${curso_id} no encontrado.`)
    }

    // Validar que el curso no haya finalizado
    const hoy = new Date();
    if (curso.fecha_fin < hoy) {
      throw new BadRequestException('No puedes inscribirte a un curso que ya finalizó.');
    }

    // Verificar que el alumno no este inscrito ya
    const inscripcionExistente = await this.inscripcionRepository.findOne({ where: { estudiante_id: estudianteId, curso_id: curso_id }});
    if (inscripcionExistente) {
      throw new BadRequestException('Ya estás inscrito en este curso.');
    }

    // Crear la inscripción con estado PENDIENTE
    const nuevaInscripcion = this.inscripcionRepository.create({
      estudiante_id: estudianteId,
      curso_id: curso_id,
      estado: EstadoInscripcion.PENDIENTE,
    });
    const inscripcionGuardada = await this.inscripcionRepository.save(nuevaInscripcion);

    return{
      message: " Inscripción realizada con éxito. (Estado pendiente)",
      inscripcion: inscripcionGuardada,
    };
  }

  // (Para admin) Obtener todas las inscripciones
  async findALl(){
    return await this.inscripcionRepository.find({ relations: ['estudiante', 'curso']}); 
  }

  // Obtener inscripciones de un estudiante específico
  async findByEstudiante(estudianteId: number) {
    return await this.inscripcionRepository.find({
      where: { estudiante_id: estudianteId },
      relations: ['curso', 'curso.profesor'],
    });
  }

  //Obtener inscripciones de un curso específico
  async findByCurso(cursoId: number) {
    return await this.inscripcionRepository.find({
      where: { curso_id: cursoId },
      relations: ['estudiante', 'estudiante.usuario'],
    });
  }

  //Obtener inscripciones pendientes de un curso
  async findPendientesByCurso(cursoId: number) {
    return await this.inscripcionRepository.find({
      where: {
        curso_id: cursoId,
        estado: EstadoInscripcion.PENDIENTE,
      },
      relations: ['estudiante', 'estudiante.usuario'],
    });
  }

  //Obtener una inscripción específica por ID
  async findOne(id: number) {
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { id },
      relations: ['estudiante', 'estudiante.usuario', 'curso', 'curso.profesor'],
    });
    if (!inscripcion) {
      throw new NotFoundException(`Inscripción con ID ${id} no encontrada.`);
    }
    
    return inscripcion;
  }

  // Actualizar estado de inscripción (aceptar/rechazar)
  async updateEstado(id: number, updateInscripcionDto: UpdateInscripcioneDto, profesorId?: number) {
    const inscripcion = await this.findOne(id);
    //Si es un profesor, verificar que sea su curso
    if (profesorId) {
      if (inscripcion.curso.profesor_id !== profesorId) {
        throw new ForbiddenException('Solo puedes gestionar inscripciones de tus propios cursos.');
      }
    }
    //Actualizar los campos
    Object.assign(inscripcion, updateInscripcionDto);
    const inscripcionActualizada = await this.inscripcionRepository.save(inscripcion);

    return {
      message: 'Inscripción actualizada con éxito.',
      inscripcion: inscripcionActualizada,
    };
  }
  

  //Asignar nota a un estudiante
  async asignarNota(id: number, nota: number, profesorId?: number) {
    const inscripcion = await this.findOne(id);
    //Solo se puede asignar nota a inscripciones aceptadas
    if (inscripcion.estado !== EstadoInscripcion.APROBADA) {
      throw new BadRequestException('Solo puedes asignar notas a inscripciones aceptadas.');
    }
    //Si es un profesor, verificar que sea su curso
    if (profesorId) {
      if (inscripcion.curso.profesor_id !== profesorId) {
        throw new ForbiddenException('Solo puedes asignar notas en tus propios cursos.');
      }
    }
    //Actualizar la nota
    inscripcion.nota = nota;
    const inscripcionActualizada = await this.inscripcionRepository.save(inscripcion);

    return {
      message: 'Nota asignada con éxito.',
      inscripcion: inscripcionActualizada,
    };
  }

  // (Solo para Admin) Eliminar inscripción 
  async remove(id: number, profesorId?: number) {
    const inscripcion = await this.findOne(id);
    //Si es un profesor, verificar que sea su curso
    if (profesorId) {
      if (inscripcion.curso.profesor_id !== profesorId) {
        throw new ForbiddenException('Solo puedes dar de baja estudiantes de tus propios cursos.');
        }
      }
    await this.inscripcionRepository.remove(inscripcion);

    return {
      message: 'Inscripción eliminada con éxito.',
    };
  }

  //Obtener inscripciones por estado
  async findByEstado(estado: EstadoInscripcion) {
    return await this.inscripcionRepository.find({
      where: { estado },
      relations: ['estudiante', 'estudiante.usuario', 'curso'],
    });
  }

  //Estadísticas de un curso
  async getEstadisticasCurso(cursoId: number) {
    const inscripciones = await this.findByCurso(cursoId);

    const total = inscripciones.length;
    const pendientes = inscripciones.filter(i => i.estado === EstadoInscripcion.PENDIENTE).length;
    const aceptadas = inscripciones.filter(i => i.estado === EstadoInscripcion.APROBADA).length;
    const rechazadas = inscripciones.filter(i => i.estado === EstadoInscripcion.RECHAZADA).length;
        
    return{
      curso_id: cursoId,
      total_inscripciones: total,
      pendientes,
      aceptadas,
      rechazadas,
    };
  }
}
