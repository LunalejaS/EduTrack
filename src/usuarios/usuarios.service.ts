//Servicio de usuarios

import { Injectable } from '@nestjs/common';
import { InjectRepository }  from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/crate-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
    //Inyectamos el repositorio de Usuario
    constructor(
        @InjectRepository(Usuario)
        private usaurioRepository: Repository<Usuario>,
    ){}

    //CRUD basico
    //crear un usuario
    create(data: CreateUsuarioDto){
        const usuario = this.usaurioRepository.create(data);
        return this.usaurioRepository.save(usuario);
    }
    //obtener todos los usuarios
    findAll(){
        return this.usaurioRepository.find();
    }
    //obtener un usuario por id
    findOne(id: number){
        return this.usaurioRepository.findOneBy({id});
    }
    //actualizar un usuario
    update(id: number, data: UpdateUsuarioDto){
        return this.usaurioRepository.update(id, data);
    }
    //eliminar un usuario
    async remove(id: number){
        await this.usaurioRepository.delete(id);
        return { message: `Usuario con id ${id} eliminado correctamente` };
    }

}
