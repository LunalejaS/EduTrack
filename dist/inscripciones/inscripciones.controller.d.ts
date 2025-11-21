import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';
export declare class InscripcionesController {
    private readonly inscripcionesService;
    constructor(inscripcionesService: InscripcionesService);
    create(createInscripcioneDto: CreateInscripcioneDto): Promise<import("../entities/inscripcion.entity").Inscripcion>;
    findAll(): Promise<import("../entities/inscripcion.entity").Inscripcion[]>;
    findOne(id: number): Promise<import("../entities/inscripcion.entity").Inscripcion>;
    update(id: number, updateInscripcioneDto: UpdateInscripcioneDto): Promise<import("../entities/inscripcion.entity").Inscripcion>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
