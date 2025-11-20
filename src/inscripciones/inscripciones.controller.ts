//Controlador de inscripciones

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}
  
  //Metodos CRUD básicos
  //Crear una nueva inscripción
  @Post()
  create(@Body() createInscripcioneDto: CreateInscripcioneDto) {
    return this.inscripcionesService.create(createInscripcioneDto);
  }

  //Obtener todas las inscripciones
  @Get()
  findAll() {
    return this.inscripcionesService.findAll();
  }

  //Obtener una inscripción por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.findOne(id);
  }

  //Actualizar una inscripción
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInscripcioneDto: UpdateInscripcioneDto) {
    return this.inscripcionesService.update(id, updateInscripcioneDto);
  }

  //Eliminar una inscripción
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.remove(id);
  }
}
