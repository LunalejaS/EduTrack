import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from 'src/entities/curso.entity';
import { Repository } from 'typeorm';
export declare class CursosService {
    private readonly cursoRepository;
    private readonly profesorRepository;
    constructor(cursoRepository: Repository<Curso>, profesorRepository: Repository<Curso>);
    create(createCursoDto: CreateCursoDto): Promise<Curso>;
    findAll(): Promise<Curso[]>;
    findOne(id: number): Promise<Curso>;
    update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
