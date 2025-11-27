//Controlador de inscripciones

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolUsuario } from 'src/enums/rol-usuario.enum';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Usuario } from 'src/users/entities/usuario.entity';

@ApiTags('inscripciones')
@Controller('inscripciones')
@UseGuards(AuthGuard, RolesGuard)
export class InscripcionesController {
  constructor(
    private readonly inscripcionesService: InscripcionesService
  ) {}
  
  // (Para estudiantes) Inscripción a cursos
  @Post()
  @Roles(RolUsuario.ESTUDIANTE)
  async inscribirse(@CurrentUser() usuario: Usuario, @Body() createInscripcionDto: CreateInscripcioneDto,) {
    
    return await this.inscripcionesService.inscribirse(usuario.id, createInscripcionDto);
  }

  // (Para admin) Ver todas las inscripciones
  @Get()
  @Roles(RolUsuario.ADMINISTRADOR)
  async findAll(){
    const inscripciones = await this.inscripcionesService.findALl();
    
    return{
      message: 'Lista inscripciones.',
      total: inscripciones.length,
      inscripciones,
    };
  }

  // (Para estudiantes) Ver sus inscripciones
  @Get('mis-inscripciones')
  @Roles(RolUsuario.ESTUDIANTE)
  async misInscripciones(@CurrentUser() usuario: Usuario){
    const inscripciones = await this.inscripcionesService.findByEstudiante(usuario.id);
    
    return{
      message: 'Tus inscripciones',
      total: inscripciones.length,
      inscripciones,
    };
  }

  // (Para profesor del curso o admin) Ver inscripciones de un curso
  @Get('curso/:cursoId')
  @Roles(RolUsuario.ADMINISTRADOR, RolUsuario.PROFESOR)
  async inscripcionesPorCurso(@Param('cursoId', ParseIntPipe) cursoId : number, @CurrentUser() usuario: Usuario){
    const inscripciones = await this.inscripcionesService.findByCurso(cursoId);
    
    return{
      message: ` Inscripciones del curso ${cursoId}`,
      total: inscripciones.length,
      inscripciones,
    };1
  }

  // (Para profesor o admin) Ver inscripciones pendientes
  @Get('curso/:cursoId/estadisticas')
  @Roles(RolUsuario.PROFESOR, RolUsuario.ADMINISTRADOR)
  async estadisticasCurso(@Param('cursoId', ParseIntPipe) cursoId: number){
    
    return await this.inscripcionesService.getEstadisticasCurso(cursoId);
  }

  // Ver una inscripción específica
  @Get(':id')
  @Roles(RolUsuario.PROFESOR, RolUsuario.ADMINISTRADOR)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const inscripcion = await this.inscripcionesService.findOne(id);
    
    return {
      message: 'Inscripción encontrada',
      inscripcion,
    };
  }

  // (Para profesor o Admin) Aceptar/Rechazar inscripción
  @Patch(':id/estado')
  @Roles(RolUsuario.PROFESOR, RolUsuario.ADMINISTRADOR)
  async updateEstado(@Param('id', ParseIntPipe) id: number, @Body() updateInscripcionDto: UpdateInscripcioneDto, @CurrentUser() usuario: Usuario) {
    const profesorId = usuario.rol === RolUsuario.PROFESOR ? usuario.id : undefined;
    
    return await this.inscripcionesService.updateEstado(id, updateInscripcionDto, profesorId);
  }

  // (Para profesor o admin) Asignar nota
  @Patch(':id/nota')
  @Roles(RolUsuario.PROFESOR, RolUsuario.ADMINISTRADOR)
  async asignarNota(@Param('id', ParseIntPipe) id: number, @Body('nota') nota: number, @CurrentUser() usuario: Usuario) {
    const profesorId = usuario.rol === RolUsuario.PROFESOR ? usuario.id : undefined;
        
    return await this.inscripcionesService.asignarNota(id, nota, profesorId);
  }

  // (Para profesor o Admin) Dar de baja / eliminar inscripción
  @Delete(':id')
  @Roles(RolUsuario.PROFESOR, RolUsuario.ADMINISTRADOR)
  async remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() usuario: Usuario) {
    const profesorId = usuario.rol === RolUsuario.PROFESOR ? usuario.id : undefined;
    
    return await this.inscripcionesService.remove(id, profesorId);
  }
}
