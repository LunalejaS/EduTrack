//Curso Controller: Gestiona las rutas relacionadas con los cursos

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cursos')
@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  //CRUD básico
  // Crear un nuevo curso
  @ApiOperation({summary: 'Crear un nuevo curso.'})
  @ApiResponse({status: 201, description: 'Curso creado correctamente'})
  @ApiResponse({status: 400, description: 'Datos inválidos'})
  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  // Obtener todos los cursos
  @ApiOperation({summary: 'Obtener todos los Cursos'})
  @ApiResponse({status: 200, description: 'Lista de Cursos obtenida'})
  @Get()
  findAll() {
    return this.cursosService.findAll();
  }

  // Obtener un curso por su ID
  @ApiOperation({summary: 'Obtener un Curso por su ID'})
  @ApiResponse({status: 200, description: 'Curso encontrado'})
  @ApiResponse({status: 404, description: 'Curso no encontrado'})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cursosService.findOne(id);
  }

  // Actualizar un curso
  @ApiOperation({summary: 'Actualizar un Curso'})
  @ApiResponse({status: 200, description: 'Curso Actualizado'})
  @ApiResponse({status: 404, description: 'Curso no encontrado'})
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursosService.update(id, updateCursoDto);
  }
  
  // Eliminar un curso
  @ApiOperation({summary: 'Eliminar un Curso'})
  @ApiResponse({status: 200, description: 'Curso eliminado con éxito'})
  @ApiResponse({status: 404, description: 'Curso no encontrado'})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cursosService.remove(+id);
  }
}
