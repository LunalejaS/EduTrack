//Controlador de inscripciones

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('inscripciones')
@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}
  
  //Metodos CRUD básicos
  //Crear una nueva inscripción
  @ApiOperation({summary: 'Crear una nueva Inscripción.'})
  @ApiResponse({status: 400, description: 'Datos inválidos'})
  @ApiResponse({status: 201, description: 'Inscripción creado correctamente'})
  @Post()
  create(@Body() createInscripcioneDto: CreateInscripcioneDto) {
    return this.inscripcionesService.create(createInscripcioneDto);
  }

  //Obtener todas las inscripciones
  @ApiOperation({summary: 'Obtener todas las Inscripciones'})
  @ApiResponse({status: 200, description: 'Lista de Inscripciones obtenida'})
  @Get()
  findAll() {
    return this.inscripcionesService.findAll();
  }

  //Obtener una inscripción por ID
  @ApiOperation({summary: 'Obtener Inscripción por su ID'})
  @ApiResponse({status: 200, description: 'Inscripción encontrada'})
  @ApiResponse({status: 404, description: 'Inscripción no encontrada'})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.findOne(id);
  }

  //Actualizar una inscripción
  @ApiOperation({summary: 'Actualizar una Inscripción'})
  @ApiResponse({status: 200, description: 'Inscripción Actualizado'})
  @ApiResponse({status: 404, description: 'Inscripción no encontrado'})
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInscripcioneDto: UpdateInscripcioneDto) {
    return this.inscripcionesService.update(id, updateInscripcioneDto);
  }

  //Eliminar una inscripción
  @ApiOperation({summary: 'Eliminar una inscripción'})
  @ApiResponse({status: 200, description: 'Inscripción eliminada con éxito'})
  @ApiResponse({status: 404, description: 'Inscripción no encontrada'})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.remove(id);
  }
}
