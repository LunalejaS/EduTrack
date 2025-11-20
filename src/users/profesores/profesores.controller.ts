//Controlador para gestionar las operaciones relacionadas con los profesores

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesoreDto } from './dto/create-profesore.dto';
import { UpdateProfesoreDto } from './dto/update-profesore.dto';

@Controller('profesores')
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}
  // Acciones CRUD básicas
  // Crear un nuevo profesor
  @Post()
  create(@Body() createProfesoreDto: CreateProfesoreDto) {
    return this.profesoresService.create(createProfesoreDto);
  }

  // Obtener todos los profesores
  @Get()
  findAll() {
    return this.profesoresService.findAll();
  }

  // Obtener un profesor por su ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profesoresService.findOne(id);
  }

  // Actualizar un profesor
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProfesoreDto: UpdateProfesoreDto) {
    return this.profesoresService.update(id, updateProfesoreDto);
  }

  // Eliminar un profesor
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profesoresService.remove(id);
  }
}
