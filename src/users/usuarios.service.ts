//Servicio de usuarios

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository }  from '@nestjs/typeorm';
import { RolUsuario, Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/crate-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Profesor } from 'src/entities/profesor.entity';
import { Estudiante } from 'src/entities/estudiante.entity';

@Injectable()
export class UsuariosService {
    constructor(
        //Inyectamos el repositorio de la entidad Usuario
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        //Inyectamos el repositorio de la entidad Profesor
        @InjectRepository(Profesor)
        private readonly profesorRepository: Repository<Profesor>,
        //Inyectamos el repositorio de la entidad Estudiante
        @InjectRepository(Estudiante)
        private readonly estudianteRepository: Repository<Estudiante>,
    ){}

    //CRUD basico
    //crear un usuario
    async create(createUsuarioDto: CreateUsuarioDto) {
        const { contrasena, rol, ...rest } = createUsuarioDto;
        // Validar campos obligatorios
        if (!contrasena) throw new BadRequestException('La contraseña es obligatoria');

        // Verificar email único
        const exist = await this.usuarioRepository.findOne({ where: { email: rest.email } });
        if (exist) throw new BadRequestException('El email ya está en uso');

        // Hash contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear usuario
        const nuevoUsuario = this.usuarioRepository.create({
            ...rest,
            contrasena: hashedPassword,
            rol,
        });
        //  Guardar usuario en la base de datos
        await this.usuarioRepository.save(nuevoUsuario);

        // Crear perfil según rol
        if (rol === RolUsuario.PROFESOR) {
            const nuevoProfesor = this.profesorRepository.create({
            usuario: nuevoUsuario,
            especialidad: '',
            });
            await this.profesorRepository.save(nuevoProfesor);
        } else if (rol === RolUsuario.ESTUDIANTE) {
            const nuevoEstudiante = this.estudianteRepository.create({
            usuario: nuevoUsuario,
            ano_ingreso: ' ',
            });
            await this.estudianteRepository.save(nuevoEstudiante);
        }

        return nuevoUsuario; // Devolver el usuario creado
        }


    //obtener todos los usuarios
    findAll(){
        return this.usuarioRepository.find();
    }
    //obtener un usuario por id
    findOne(id: number){
        return this.usuarioRepository.findOneBy({id});
    }
    //actualizar un usuario
    update(id: number, data: UpdateUsuarioDto){
        return this.usuarioRepository.update(id, data);
    }
    //eliminar un usuario
    async remove(id: number){
        await this.usuarioRepository.delete(id);
        return { message: `Usuario con id ${id} eliminado correctamente` };
    }

}
