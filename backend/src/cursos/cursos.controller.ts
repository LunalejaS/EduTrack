//Curso Controller: Gestiona las rutas relacionadas con los cursos

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolUsuario } from 'src/enums/rol-usuario.enum';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Usuario } from 'src/users/entities/usuario.entity';
import { SolicitarCursoDto } from './dto/solicitar-curso.dto';

@Controller('cursos')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CursosController {
  constructor(
    private readonly cursosService: CursosService,
  ) {}

  //CRUD básico
  // (Para Admins) Crear un nuevo curso
  @Post()
  @Roles(RolUsuario.ADMINISTRADOR)
  async create(@Body() createCursoDto: CreateCursoDto) {
    const curso = await this.cursosService.create(createCursoDto);
    return {
      message: ' Curso creado con éxito.',
      curso,
    };
  }

  // Obtener todos los cursos
  @Get()
  async findAll() {
    const cursos = await this.cursosService.findAll();
    return {
      message: ' Lista de todos los cursos.',
      total: cursos.length,
      cursos,
    };
  }

  // Obtener los cursos activos
  @Get('activos')
  async findActivos(){
    const cursos= await this.cursosService.findCursosActivos();
    return{
      message: ' Cursos activos actualmente.',
      total: cursos.length,
      cursos,
    };
  }

  // (Para Profesores) Obtener cursos asignados
  @Get('mis-cursos')
  @Roles(RolUsuario.PROFESOR)
  async misCursos(@CurrentUser() usuario: Usuario){
    const cursos = await this.cursosService.findCursosByProfesor(usuario.profesor.id);
    return { 
      message: 'Mis cursos como profesor.',
      total: cursos.length,
      cursos,
    }
  }

  // Obtener un curso por su ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const curso = await this.cursosService.findOne(id);
    return {
      mesagge: ' Cursos encontrado.',
      curso,
    }
  }

  // (Para Profesor o Admin) Ver estudiantes inscritos en un curso
  @Get(':id/estudiantes')
  @Roles(RolUsuario.PROFESOR, RolUsuario.ADMINISTRADOR)
  async estudiantesInscritos(@Param('id', ParseIntPipe) id: number, @CurrentUser() usuario: Usuario){
    const profesorId = usuario.rol === RolUsuario.PROFESOR ? usuario.id : undefined;
    const curso = await this.cursosService.getEstudiantesInscritos(id, profesorId);
    
    //Verificar si hay inscripciones
    const hayInscritos = curso.inscripciones && curso.inscripciones.length > 0;
    
    return {
      message: hayInscritos ? `Estudiantes inscritos en el curso: ${curso.nombre}` : `No hay estudiantes inscritos en el curso: ${curso.nombre}`,
      curso: {
        id: curso.id,
        nombre: curso.nombre,
        total_inscritos: curso.inscripciones?.length || 0,
        estudiantes: hayInscritos 
          ? curso.inscripciones.map(ins => ({
              inscripcion_id: ins.id,
              estudiante: {
                id: ins.estudiante.id,
                nombre: ins.estudiante.usuario.nombre_completo,
                email: ins.estudiante.usuario.email,
                ano_ingreso: ins.estudiante.ano_ingreso,
              },
              estado: ins.estado,
              nota: ins.nota,
            }))
          : [], 
      },
    };
  }

  // Ver cursos de un profesor específico
  @Get('profesor/:profesorId')
  async cursosPorProfesor(@Param('profesorId', ParseIntPipe) profesorId: number) {
    const cursos = await this.cursosService.findCursosByProfesor(profesorId);
    return {
      message: `Cursos del profesor ${profesorId}`,
      total: cursos.length,
      cursos,
    };
  }

  // (Para Admins) Actualizar un curso
  @Patch('actualizar/:id')
  @Roles(RolUsuario.ADMINISTRADOR)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCursoDto: UpdateCursoDto, @CurrentUser() usuario: Usuario) {
    const profesorId = usuario.rol === RolUsuario.PROFESOR ? usuario.id: undefined;
    const curso = await this.cursosService.update(id, updateCursoDto, profesorId);
    return {
      message: ' Curso actualizado con éxito.',
      curso,
    };
  }

  // (para Admin) Asignar Profesor a un curso
  @Patch(':id/asignar-profesor')
  @Roles(RolUsuario.ADMINISTRADOR)
  async asignarProfesor(@Param('id', ParseIntPipe) id: number, @Body('profesorId') profesorId: number) {
    return await this.cursosService.asignarProfesor(id, profesorId);
  }
  
  // (Para Admins) Eliminar un curso
  @Delete(':id')
  @Roles(RolUsuario.ADMINISTRADOR)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cursosService.remove(id);
  }

  // (Para profesor) Solicitar un nuevo curso
  @Post('solicitar')
  @Roles(RolUsuario.PROFESOR)
  async solicitarCurso(@Body() solicitarCursoDto: SolicitarCursoDto, @CurrentUser() usuario: Usuario) {
    return {
      message: 'Solicitud de curso enviada. Un administrador la revisará pronto.',
      solicitud: {
        profesor_id: usuario.id,
        profesor_nombre: usuario.nombre_completo,
        ...solicitarCursoDto,
        estado: 'pendiente',
      },
    };
  }
}
