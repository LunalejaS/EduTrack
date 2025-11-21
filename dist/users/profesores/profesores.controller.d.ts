import { ProfesoresService } from './profesores.service';
import { CreateProfesoreDto } from './dto/create-profesore.dto';
import { UpdateProfesoreDto } from './dto/update-profesore.dto';
export declare class ProfesoresController {
    private readonly profesoresService;
    constructor(profesoresService: ProfesoresService);
    create(createProfesoreDto: CreateProfesoreDto): Promise<import("../../entities/profesor.entity").Profesor>;
    findAll(): Promise<import("../../entities/profesor.entity").Profesor[]>;
    findOne(id: number): Promise<import("../../entities/profesor.entity").Profesor>;
    update(id: number, updateProfesoreDto: UpdateProfesoreDto): Promise<import("../../entities/profesor.entity").Profesor>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
