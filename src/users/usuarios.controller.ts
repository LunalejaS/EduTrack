//Controlador de usuarios
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('usuarios')
export class UsuariosController {
    //Inyectamos el servicio de usuarios
    constructor(private readonly usuariosService: UsuariosService){}

    //Acciones CRUD basicas
    //Crear un nuevo usuario
    @ApiOperation({summary: 'Crear un nuevo usuario.'})
    @ApiResponse({status: 201, description: 'Usuario creado correctamente'})
    @ApiResponse({status: 400, description: 'Datos inválidos'})
    @Post()
    async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario>{
        return this.usuariosService.create(createUsuarioDto);
    }
    //Obtener todos los usuarios
    @ApiOperation({summary: 'Obtener todos los usuarios'})
    @ApiResponse({status: 200, description: 'Lista de Usuarios obtenida'})
    @Get()
    findAll(){
        return this.usuariosService.findAll();
    }
    //Obtener un usuario por id
    @ApiOperation({summary: 'Obtener un usuario por su ID'})
    @ApiResponse({status: 200, description: 'Usuario encontrado'})
    @ApiResponse({status: 404, description: 'Usuario no encontrado'})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.usuariosService.findOne(1);
    }
    //Actualizar un usuario
    @ApiOperation({summary: 'Actualizar un usuario'})
    @ApiResponse({status: 200, description: 'Usuario Actualizado'})
    @ApiResponse({status: 404, description: 'Usuario no encontrado'})
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: CreateUsuarioDto){
        return this.usuariosService.update(+id, data);
    }
    //Eliminar un usuario
    @ApiOperation({summary: 'Eliminar un usuario'})
    @ApiResponse({status: 200, description: 'Usuario eliminado con éxito'})
    @ApiResponse({status: 404, description: 'Usuario no encontrado'})
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.usuariosService.remove(+id);
    }
}