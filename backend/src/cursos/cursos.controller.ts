//Curso Controller: Gestiona las rutas relacionadas con los cursos

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolUsuario } from 'src/enums/rol-usuario.enum';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Usuario } from 'src/users/entities/usuario.entity';

@ApiTags('Cursos')
@Controller('cursos')
@UseGuards(AuthGuard, RolesGuard)
export class CursosController {
  constructor(
    private readonly cursosService: CursosService,
  ) {}

  //CRUD básico
  // (Para Admins) Crear un nuevo curso
  @ApiOperation({summary: 'Crear un nuevo curso.'})
  @ApiResponse({status: 201, description: 'Curso creado correctamente'})
  @ApiResponse({status: 400, description: 'Datos inválidos'})
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
  @ApiOperation({summary: 'Obtener todos los Cursos'})
  @ApiResponse({status: 200, description: 'Lista de Cursos obtenida'})
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
    const cursos = await this.cursosService.findCursosByProfesor(usuario.id);
    return { 
      message: 'Mis cursos como profesor.',
      total: cursos.length,
      cursos,
    }
  }

  // Obtener un curso por su ID
  @ApiOperation({summary: 'Obtener un Curso por su ID'})
  @ApiResponse({status: 200, description: 'Curso encontrado'})
  @ApiResponse({status: 404, description: 'Curso no encontrado'})
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const curso = await this.cursosService.findOne(id);
    return {
      mesagge: ' Cursos encontrado.',
      curso,
    }
  }

  // (Para Admins) Actualizar un curso
  @ApiOperation({summary: 'Actualizar un Curso'})
  @ApiResponse({status: 200, description: 'Curso Actualizado'})
  @ApiResponse({status: 404, description: 'Curso no encontrado'})
  @Patch(':id')
  @Roles(RolUsuario.ADMINISTRADOR)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCursoDto: UpdateCursoDto) {
    const curso = await this.cursosService.update(id, updateCursoDto);
    return {
      message: ' Curso actualizado con éxito.',
      curso,
    };
  }
  
  // (Para Admins) Eliminar un curso
  @ApiOperation({summary: 'Eliminar un Curso'})
  @ApiResponse({status: 200, description: 'Curso eliminado con éxito'})
  @ApiResponse({status: 404, description: 'Curso no encontrado'})
  @Delete(':id')
  @Roles(RolUsuario.ADMINISTRADOR)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cursosService.remove(id);
  }
}
