import { Profesor } from "src/entities/profesor.entity";
import { Usuario } from "src/entities/usuario.entity";
import { Repository } from "typeorm";
import { CreateProfesoreDto } from "./dto/create-profesore.dto";
import { UpdateProfesoreDto } from "./dto/update-profesore.dto";
export declare class ProfesoresService {
    private readonly profesorRepository;
    private readonly usuarioRepository;
    constructor(profesorRepository: Repository<Profesor>, usuarioRepository: Repository<Usuario>);
    create(createProfesorDto: CreateProfesoreDto): Promise<Profesor>;
    findAll(): Promise<Profesor[]>;
    findOne(id: number): Promise<Profesor>;
    update(id: number, updateProfesorDto: UpdateProfesoreDto): Promise<Profesor>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
