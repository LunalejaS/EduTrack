//COntroller para gestionar las rutas relacionadas con los estudiantes

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Estudiantes')
@Controller('estudiantes')
export class EstudiantesController {
  // Inyección del servicio de estudiantes
  constructor(private readonly estudiantesService: EstudiantesService) {}

  // Acciones CRUD básicas
  // Crear un nuevo estudiante
  @ApiOperation({summary: 'Crear un nuevo estudiante.'})
  @ApiResponse({status: 201, description: 'Estudiante creado correctamente'})
  @ApiResponse({status: 400, description: 'Datos inválidos'})
  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudiantesService.create(createEstudianteDto);
  }

  // Obtener todos los estudiantes
  @ApiOperation({summary: 'Obtener todos los estudiantes'})
  @ApiResponse({status: 200, description: 'Lista de Estudiantes obtenida'})
  @Get()
  findAll() {
    return this.estudiantesService.findAll();
  }

  // Obtener un estudiante por su ID
  @ApiOperation({summary: 'Obtener un estudiante por su ID'})
  @ApiResponse({status: 200, description: 'Estudiante encontrado'})
  @ApiResponse({status: 404, description: 'Estudiante no encontrado'})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.findOne(id);
  }

  // Actualizar un estudiante
  @ApiOperation({summary: 'Actualizar un Estudiante'})
    @ApiResponse({status: 200, description: 'Estudiante Actualizado'})
    @ApiResponse({status: 404, description: 'Estudiante no encontrado'})
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudiantesService.update(id, updateEstudianteDto);
  }

  //Eliminar estudiante por id
  @ApiOperation({summary: 'Eliminar un Estudiante'})
  @ApiResponse({status: 200, description: 'Estudiante eliminado con éxito'})
  @ApiResponse({status: 404, description: 'Estudiante no encontrado'})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.remove(id);
  }
}
