//Controlador para gestionar las operaciones relacionadas con los profesores

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesoreDto } from './dto/create-profesore.dto';
import { UpdateProfesoreDto } from './dto/update-profesore.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Profesores')
@Controller('profesores')
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}
  // Acciones CRUD básicas
  // Crear un nuevo profesor
  @ApiOperation({summary: 'Crear un nuevo usuario que tiene como rol "profesor".'})
  @ApiResponse({status: 201, description: 'Profesor creado correctamente'})
  @ApiResponse({status: 400, description: 'Datos inválidos'})
  @Post()
  create(@Body() createProfesoreDto: CreateProfesoreDto) {
    return this.profesoresService.create(createProfesoreDto);
  }

  // Obtener todos los profesores
  @ApiOperation({summary: 'Obtener todos los profesores'})
  @ApiResponse({status: 200, description: 'Lista de Profesores obtenida'})
  @Get()
  findAll() {
    return this.profesoresService.findAll();
  }

  // Obtener un profesor por su ID
  @ApiOperation({summary: 'Obtener un profesor por su ID'})
  @ApiResponse({status: 200, description: 'Profesor encontrado'})
  @ApiResponse({status: 404, description: 'Profesor no encontrado'})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profesoresService.findOne(id);
  }

  // Actualizar un profesor
  @ApiOperation({summary: 'Actualizar un profesor'})
  @ApiResponse({status: 200, description: 'Profesor Actualizado'})
  @ApiResponse({status: 404, description: 'Profesor no encontrado'})
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProfesoreDto: UpdateProfesoreDto) {
    return this.profesoresService.update(id, updateProfesoreDto);
  }

  // Eliminar un profesor
  @ApiOperation({summary: 'Eliminar un profesor'})
  @ApiResponse({status: 200, description: 'Profesor eliminado con éxito'})
  @ApiResponse({status: 404, description: 'Profesor no encontrado'})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profesoresService.remove(id);
  }
}
