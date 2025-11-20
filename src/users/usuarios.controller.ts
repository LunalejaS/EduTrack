//Controlador de usuarios
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
    //Inyectamos el servicio de usuarios
    constructor(private readonly usuariosService: UsuariosService){}

    //Acciones CRUD basicas
    //Crear un nuevo usuario
    @Post()
    async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario>{
        return this.usuariosService.create(createUsuarioDto);
    }
    //Obtener todos los usuarios
    @Get()
    findAll(){
        return this.usuariosService.findAll();
    }
    //Obtener un usuario por id
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.usuariosService.findOne(1);
    }
    //Actualizar un usuario
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: CreateUsuarioDto){
        return this.usuariosService.update(+id, data);
    }
    //Eliminar un usuario
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.usuariosService.remove(+id);
    }
}