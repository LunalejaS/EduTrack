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
exports.EstudiantesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const estudiante_entity_1 = require("../../entities/estudiante.entity");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("../../entities/usuario.entity");
let EstudiantesService = class EstudiantesService {
    estudianteRepository;
    usuarioRepository;
    constructor(estudianteRepository, usuarioRepository) {
        this.estudianteRepository = estudianteRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async create(createEstudianteDto) {
        const { usuarioId, ano_ingreso } = createEstudianteDto;
        const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario) {
            throw new common_1.NotFoundException(`El usuario con ID ${usuarioId} no existe.`);
        }
        if (usuario.rol !== usuario_entity_1.RolUsuario.ESTUDIANTE) {
            throw new common_1.BadRequestException(`El usuario con ID ${usuarioId} no es un estudiante.`);
        }
        const existenteEstudiante = await this.estudianteRepository.findOne({ where: { id: usuarioId } });
        if (existenteEstudiante) {
            throw new common_1.BadRequestException(`El estudiante con ID ${usuarioId} ya está registrado como estudiante.`);
        }
        const nuevoEstudiante = this.estudianteRepository.create({
            id: usuarioId,
            ano_ingreso,
            usuario,
        });
        return await this.estudianteRepository.save(nuevoEstudiante);
    }
    async findAll() {
        return await this.estudianteRepository.find({ relations: ['usuario', 'inscripciones'] });
    }
    async findOne(id) {
        const estudiante = await this.estudianteRepository.findOne({
            where: { id },
            relations: ['usuario', 'inscripciones'],
        });
        if (!estudiante) {
            throw new common_1.NotFoundException(`El estudiante con ID ${id} no existe.`);
        }
        return estudiante;
    }
    async update(id, updateEstudianteDto) {
        const estudiante = await this.findOne(id);
        Object.assign(estudiante, updateEstudianteDto);
        return await this.estudianteRepository.save(estudiante);
    }
    async remove(id) {
        const estudiante = await this.findOne(id);
        await this.estudianteRepository.remove(estudiante);
        return { message: `Estudiante con ID ${id} eliminado exitosamente` };
    }
};
exports.EstudiantesService = EstudiantesService;
exports.EstudiantesService = EstudiantesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estudiante_entity_1.Estudiante)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EstudiantesService);
//# sourceMappingURL=estudiantes.service.js.map