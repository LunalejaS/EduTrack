import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
export declare class CursosController {
    private readonly cursosService;
    constructor(cursosService: CursosService);
    create(createCursoDto: CreateCursoDto): Promise<import("../entities/curso.entity").Curso>;
    findAll(): Promise<import("../entities/curso.entity").Curso[]>;
    findOne(id: number): Promise<import("../entities/curso.entity").Curso>;
    update(id: number, updateCursoDto: UpdateCursoDto): Promise<import("../entities/curso.entity").Curso>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
