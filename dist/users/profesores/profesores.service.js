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
exports.ProfesoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const profesor_entity_1 = require("../../entities/profesor.entity");
const usuario_entity_1 = require("../../entities/usuario.entity");
const typeorm_2 = require("typeorm");
let ProfesoresService = class ProfesoresService {
    profesorRepository;
    usuarioRepository;
    constructor(profesorRepository, usuarioRepository) {
        this.profesorRepository = profesorRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async create(createProfesorDto) {
        const { usuarioId, especialidad } = createProfesorDto;
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioId },
        });
        if (!usuario) {
            throw new common_1.NotFoundException(`El usuario con id ${usuarioId} no existe`);
        }
        if (usuario.rol !== usuario_entity_1.RolUsuario.PROFESOR) {
            throw new common_1.BadRequestException(`El usuario con id ${usuarioId} no es un profesor`);
        }
        const yaExisteProfesor = await this.profesorRepository.findOne({
            where: { id: usuarioId },
        });
        if (yaExisteProfesor) {
            throw new common_1.BadRequestException(`El profesor con id ${usuarioId} ya esta registrado como profesor`);
        }
        const nuevoProfesor = this.profesorRepository.create({
            id: usuarioId,
            especialidad,
            usuario,
        });
        return await this.profesorRepository.save(nuevoProfesor);
    }
    async findAll() {
        return await this.profesorRepository.find({
            relations: ['usuario', 'cursos'],
        });
    }
    async findOne(id) {
        const profesor = await this.profesorRepository.findOne({
            where: { id },
            relations: ['usuario', 'cursos'],
        });
        if (!profesor) {
            throw new common_1.NotFoundException(`Profesor con id ${id} no existe`);
        }
        return profesor;
    }
    async update(id, updateProfesorDto) {
        const profesor = await this.profesorRepository.findOneBy({ id });
        if (!profesor) {
            throw new common_1.NotFoundException(`Profesor con id ${id} no existe`);
        }
        Object.assign(profesor, updateProfesorDto);
        return this.profesorRepository.save(profesor);
    }
    async remove(id) {
        const profesor = await this.findOne(id);
        await this.profesorRepository.remove(profesor);
        return { message: `Profesor con id ${id} eliminado correctamente` };
    }
};
exports.ProfesoresService = ProfesoresService;
exports.ProfesoresService = ProfesoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profesor_entity_1.Profesor)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProfesoresService);
//# sourceMappingURL=profesores.service.js.map