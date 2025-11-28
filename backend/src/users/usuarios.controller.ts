//Usuarios COntroler

import { Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { Usuario } from "./entities/usuario.entity";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolUsuario } from "src/enums/rol-usuario.enum";
import { ProfesoresService } from "./profesores.service";
import { EstudiantesService } from "./estudiantes.service";

@Controller('usuarios')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsuariosController {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly profesoresService: ProfesoresService,
        private readonly estudiantesService: EstudiantesService,
    ){}

    // Ontener perfil actual
    @Get('perfil')
    async findOne(@CurrentUser() usuario: Usuario){
        return { 
            message: 'Perfil del usuario', 
            usuario};
    }

    // (Para Administradores) Obtener todos los Usuarios
    @Get()
    @Roles(RolUsuario.ADMINISTRADOR)
    async findAll() {
        const usuarios = await  this.usuariosService.findAll();
        if(!usuarios || usuarios.length === 0){
            throw new NotFoundException(" No hay usuarios registrados aún.");
        }

        return {
            message: 'Lista de todos los usuarios',
            total: usuarios.length,
            usuarios,
        };
    }

    // (Para Administradores) Obtener usuarios por rol
    @Get('rol/:rol')
    @Roles(RolUsuario.ADMINISTRADOR)
    async findRol(@Param('rol') rol: string){
        const usuarios = await this.usuariosService.findByRol(rol);
        return{
            message: `Usuarios con rol: ${ rol }`,
            total: usuarios.length,
            usuarios,
        };
    }

    // (Para Administradores) Obtener un usuario específico por ID
    @Get('find/:id')
    @Roles(RolUsuario.ADMINISTRADOR)
    async findById(@Param('id') id: string){
        const usuario = await this.usuariosService.findByID(+id);
        if(!usuario){
            throw new NotFoundException(` No existe el usuario con id ${id}.`);
        }
        return {
            message: ' Usuario Encontrado.',
            usuario,
        };
    }

    // Deshboard personalizado según rol
    @Get('dashboard/info')
    async dashboard(@CurrentUser() usuario: Usuario){
        let mensaje = ' ';
        let infoAdicional: any = null;

        switch (usuario.rol){
            case RolUsuario.ADMINISTRADOR:
                mensaje = 'Panel de Administrador'
                const totalUsuarios = await this.usuariosService.findAll();
                const totalAdministradores = await this.usuariosService.findByRol(RolUsuario.ADMINISTRADOR);
                const totalEstudiantes = await this.usuariosService.findByRol(RolUsuario.ESTUDIANTE);
                const totalProfesores = await this.usuariosService.findByRol(RolUsuario.PROFESOR);

                infoAdicional = {
                    estadisticas: {
                        total_usuarios: totalUsuarios.length,
                        total_administradores: totalAdministradores.length,
                        total_estudiantes: totalEstudiantes.length,
                        total_profesor: totalProfesores.length,
                    }
                };
                break;
            
            case RolUsuario.PROFESOR:
                mensaje = 'Panel de Profesor'
                const profesor = await this.profesoresService.findById(usuario.id);
                infoAdicional = {
                    total_cursos: profesor?.cursos?.length || 0,
                    cursos: profesor?.cursos || [],
                };
                break;
            
            case RolUsuario.ESTUDIANTE:
                mensaje = 'Panel de Estuudiante'
                const estudiante = await this.estudiantesService.findByID(usuario.id);
                infoAdicional = {
                    ano_ingreso: estudiante?.ano_ingreso,
                    total_inscripciones: estudiante?.inscripciones?.length || 0,
                    inscripciones: estudiante?.inscripciones || [], 
                };
                break;
        }

        return {
            mensaje,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre_completo,
                email: usuario.email,
                rol: usuario.rol,
            },
            ...infoAdicional,
        };
    }

    // (Para estudiantes y profesores) Obtener lista de todos los estudiantes
    @Get('estudiantes/todos')
    @Roles(RolUsuario.PROFESOR, RolUsuario.ESTUDIANTE)
    async listarEstudiantes() {
        const estudiantes = await this.usuariosService.findByRol(RolUsuario.ESTUDIANTE);
        return {
            message: 'Lista de estudiantes',
            total: estudiantes.length,
            estudiantes,
        };
    }

    // (Para administradores) Obtener lista de Profesores
    @Get('profesores/todos')
    @Roles(RolUsuario.ADMINISTRADOR)
    async listarProfesores(){
        const profesores = await this.usuariosService.findByRol(RolUsuario.PROFESOR);
        return {
            message: 'Lista de profesores',
            total: profesores.length,
            profesores,
        };
    }

    // (Para administradores) Eliminar Profesor
    @Delete('remove/profesor/:id')
    @Roles(RolUsuario.ADMINISTRADOR)
    async removeProfesor(@Param('id', ParseIntPipe) id: number) {
        return this.profesoresService.removeByUserId(id);
    }

    // (Para administradores o profesores) Eliminar estudiante
    @Delete('remove/estudiante/:id')
    @Roles(RolUsuario.ADMINISTRADOR, RolUsuario.PROFESOR)
    async removeEstudiante(@Param('id', ParseIntPipe) id: number) {
        return this.estudiantesService.removeByUserId(id);
    }

    // (Para administradores) Eliminar cualquier usuario
    @Delete('remove/:id')
    @Roles(RolUsuario.ADMINISTRADOR)
    async removeUser(@Param('id', ParseIntPipe) id: number) {
        const usuario = await this.usuariosService.findByID(id);

        if (!usuario) {
            throw new NotFoundException(`No existe el usuario con id ${id}.`);
        }

        switch (usuario.rol) {
            case RolUsuario.PROFESOR:
                return this.profesoresService.removeByUserId(id);

            case RolUsuario.ESTUDIANTE:
                return this.estudiantesService.removeByUserId(id);

            case RolUsuario.ADMINISTRADOR:
                // Opcional: podrías bloquear borrar admin
                return this.usuariosService.remove(id);
        }
    }
}