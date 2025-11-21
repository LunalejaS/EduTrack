import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from 'src/entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/entities/usuario.entity';
export declare class EstudiantesService {
    private readonly estudianteRepository;
    private readonly usuarioRepository;
    constructor(estudianteRepository: Repository<Estudiante>, usuarioRepository: Repository<Usuario>);
    create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante>;
    findAll(): Promise<Estudiante[]>;
    findOne(id: number): Promise<Estudiante>;
    update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
