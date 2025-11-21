import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';
import { Estudiante } from 'src/entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Inscripcion } from 'src/entities/inscripcion.entity';
import { Curso } from 'src/entities/curso.entity';
export declare class InscripcionesService {
    private readonly estudianteRepository;
    private readonly inscripcionRepository;
    private readonly cursoRepository;
    constructor(estudianteRepository: Repository<Estudiante>, inscripcionRepository: Repository<Inscripcion>, cursoRepository: Repository<Curso>);
    create(createInscripcioneDto: CreateInscripcioneDto): Promise<Inscripcion>;
    findAll(): Promise<Inscripcion[]>;
    findOne(id: number): Promise<Inscripcion>;
    update(id: number, updateInscripcioneDto: UpdateInscripcioneDto): Promise<Inscripcion>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
