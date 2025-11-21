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
exports.CursosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const curso_entity_1 = require("../entities/curso.entity");
const typeorm_2 = require("typeorm");
const profesor_entity_1 = require("../entities/profesor.entity");
let CursosService = class CursosService {
    cursoRepository;
    profesorRepository;
    constructor(cursoRepository, profesorRepository) {
        this.cursoRepository = cursoRepository;
        this.profesorRepository = profesorRepository;
    }
    async create(createCursoDto) {
        const { nombre, descripcion, duracion_horas, profesorId } = createCursoDto;
        const profesor = await this.profesorRepository.findOne({ where: { id: profesorId } });
        7;
        if (!profesor) {
            throw new common_1.NotFoundException(`El profesor con ID ${profesorId} no existe.`);
        }
        const nuevoCurso = this.cursoRepository.create({
            nombre,
            descripcion,
            duracion_horas,
            profesor,
        });
        return await this.cursoRepository.save(nuevoCurso);
    }
    async findAll() {
        return await this.cursoRepository.find({ relations: ['profesor', 'inscripciones'] });
    }
    async findOne(id) {
        const curso = await this.cursoRepository.findOne({
            where: { id },
            relations: ['profesor', 'inscripciones'],
        });
        if (!curso) {
            throw new common_1.NotFoundException(`El curso con ID ${id} no existe.`);
        }
        return curso;
    }
    async update(id, updateCursoDto) {
        const curso = await this.findOne(id);
        Object.assign(curso, updateCursoDto);
        return await this.cursoRepository.save(curso);
    }
    async remove(id) {
        const curso = await this.findOne(id);
        await this.cursoRepository.remove(curso);
        return { message: `El curso con ID ${id} ha sido eliminado.` };
    }
};
exports.CursosService = CursosService;
exports.CursosService = CursosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(curso_entity_1.Curso)),
    __param(1, (0, typeorm_1.InjectRepository)(profesor_entity_1.Profesor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CursosService);
//# sourceMappingURL=cursos.service.js.map