// Usuario Service

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/users/entities/usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepositorio: Repository<Usuario>,
    ){}

    // Crear Usuario
    async create(data: Partial<Usuario>){
        const usuario = this.usuarioRepositorio.create(data);
        return this.usuarioRepositorio.save(usuario);
    }

    //Obtener usuario por Email
    async findByEmail(email: string): Promise<Usuario | null>{
        return await this.usuarioRepositorio.findOne({ where: { email }, select: ['id', 'nombre_completo', 'email', 'contrasena', 'rol']});
    }

    //Obtener usuario por ID
    async findByID(id: number): Promise<Usuario | null>{
        const usuario = await this.usuarioRepositorio.findOne({ where: {id}});
        if(!usuario){
            throw new NotFoundException(` Usuario con ID ${id} no encontrado.`);
        }

        return usuario;
    }

    //Obtener todos los usuarios
    async findAll(): Promise<Usuario[]>{
        return this.usuarioRepositorio.find();
    }

    //Obtener usuarios por rol
    async findByRol(rol: string): Promise<Usuario[]>{
        return await this.usuarioRepositorio.find({ where: { rol: rol as any}});
    }
}