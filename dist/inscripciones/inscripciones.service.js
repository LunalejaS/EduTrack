"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscripcionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const estudiante_entity_1 = require("../entities/estudiante.entity");
const typeorm_2 = require("typeorm");
const inscripcion_entity_1 = require("../entities/inscripcion.entity");
const curso_entity_1 = require("../entities/curso.entity");
let InscripcionesService = class InscripcionesService {
    estudianteRepository;
    inscripcionRepository;
    cursoRepository;
    constructor(estudianteRepository, inscripcionRepository, cursoRepository) {
        this.estudianteRepository = estudianteRepository;
        this.inscripcionRepository = inscripcionRepository;
        this.cursoRepository = cursoRepository;
    }
    async create(createInscripcioneDto) {
        const { estudianteId, cursoId, nota } = createInscripcioneDto;
        const estudiante = await this.estudianteRepository.findOne({ where: { id: estudianteId } });
        if (!estudiante) {
            throw new common_1.NotFoundException(`Estudiante con ID ${estudianteId} no encontrado`);
        }
        const curso = await this.cursoRepository.findOne({ where: { id: cursoId } });
        if (!curso) {
            throw new common_1.NotFoundException(`Curso con ID ${cursoId} no encontrado`);
        }
        const yaInscrito = await this.inscripcionRepository.findOne({ where: { estudiante: { id: estudianteId }, curso: { id: cursoId } } });
        if (yaInscrito) {
            throw new common_1.NotFoundException(`El estudiante con ID ${estudianteId} ya está inscrito en el curso con ID ${cursoId}`);
        }
        const nuevaInscripcion = this.inscripcionRepository.create({
            estudiante,
            curso,
            nota: nota ?? null,
            fecha_inscripcion: new Date(),
        });
        return this.inscripcionRepository.save(nuevaInscripcion);
    }
    async findAll() {
        return this.inscripcionRepository.find({
            relations: ['estudiante', 'curso'],
        });
    }
    async findOne(id) {
        const inscripcion = await this.inscripcionRepository.findOne({
            where: { id },
            relations: ['estudiante', 'curso'],
        });
        if (!inscripcion) {
            throw new common_1.NotFoundException(`Inscripción con ID ${id} no encontrada`);
        }
        return inscripcion;
    }
    async update(id, updateInscripcioneDto) {
        const inscripcion = await this.findOne(id);
        Object.assign(inscripcion, updateInscripcioneDto);
        return this.inscripcionRepository.save(inscripcion);
    }
    async remove(id) {
        const inscripcion = await this.findOne(id);
        await this.inscripcionRepository.remove(inscripcion);
        return { message: `Inscripción con ID ${id} cancelada correctamente.` };
    }
};
exports.InscripcionesService = InscripcionesService;
exports.InscripcionesService = InscripcionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estudiante_entity_1.Estudiante)),
    __param(1, (0, typeorm_1.InjectRepository)(inscripcion_entity_1.Inscripcion)),
    __param(2, (0, typeorm_1.InjectRepository)(curso_entity_1.Curso)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InscripcionesService);
//# sourceMappingURL=inscripciones.service.js.map