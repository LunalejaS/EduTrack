import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
export declare class EstudiantesController {
    private readonly estudiantesService;
    constructor(estudiantesService: EstudiantesService);
    create(createEstudianteDto: CreateEstudianteDto): Promise<import("../../entities/estudiante.entity").Estudiante>;
    findAll(): Promise<import("../../entities/estudiante.entity").Estudiante[]>;
    findOne(id: number): Promise<import("../../entities/estudiante.entity").Estudiante>;
    update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<import("../../entities/estudiante.entity").Estudiante>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
