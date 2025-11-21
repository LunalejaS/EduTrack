import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Profesor } from 'src/entities/profesor.entity';
import { Estudiante } from 'src/entities/estudiante.entity';
export declare class UsuariosService {
    private readonly usuarioRepository;
    private readonly profesorRepository;
    private readonly estudianteRepository;
    constructor(usuarioRepository: Repository<Usuario>, profesorRepository: Repository<Profesor>, estudianteRepository: Repository<Estudiante>);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario | null>;
    update(id: number, data: UpdateUsuarioDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
