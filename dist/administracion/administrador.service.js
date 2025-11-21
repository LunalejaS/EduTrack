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
exports.AdministradorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const curso_entity_1 = require("../entities/curso.entity");
const inscripcion_entity_1 = require("../entities/inscripcion.entity");
const profesor_entity_1 = require("../entities/profesor.entity");
const usuario_entity_1 = require("../entities/usuario.entity");
const typeorm_2 = require("typeorm");
const admin_emails_config_1 = require("./config/admin-emails.config");
let AdministradorService = class AdministradorService {
    usuarioRepository;
    cursoRepository;
    profesorRepository;
    inscripcionRepository;
    constructor(usuarioRepository, cursoRepository, profesorRepository, inscripcionRepository) {
        this.usuarioRepository = usuarioRepository;
        this.cursoRepository = cursoRepository;
        this.profesorRepository = profesorRepository;
        this.inscripcionRepository = inscripcionRepository;
    }
    validacionAdmin(email) {
        if (!email || !(0, admin_emails_config_1.esEmailAceptadoAdmin)(email)) {
            throw new common_1.ForbiddenException('No tienes permisos de Administrador');
        }
    }
    async asignarCurso(adminEmail, asignarCursoDto) {
        this.validacionAdmin(adminEmail);
        const profesor = await this.profesorRepository.findOne({ where: { id: asignarCursoDto.idProfesor } });
        if (!profesor) {
            throw new common_1.NotFoundException(`Profesor con el ID ${asignarCursoDto.idProfesor} no encontrado.`);
        }
        const curso = await this.cursoRepository.findOne({ where: { id: asignarCursoDto.idCurso } });
        if (!curso) {
            throw new common_1.NotFoundException(`Curso con el ID ${asignarCursoDto.idCurso} no encontrado.`);
        }
        curso.profesor = profesor;
        return this.cursoRepository.save(curso);
    }
    async actualizarEstadoInscripcion(adminEmail, actualizarEstadoInscripcionDto) {
        this.validacionAdmin(adminEmail);
        const inscripcion = await this.inscripcionRepository.findOne({ where: { id: actualizarEstadoInscripcionDto.idInscripcion } });
        if (!inscripcion) {
            throw new common_1.NotFoundException(`Inscripción con el ID ${actualizarEstadoInscripcionDto.idInscripcion} no encontrada.`);
        }
        if (actualizarEstadoInscripcionDto.nota !== undefined) {
            inscripcion.nota = actualizarEstadoInscripcionDto.nota;
        }
        if (actualizarEstadoInscripcionDto.estado !== undefined) {
            inscripcion.estado = actualizarEstadoInscripcionDto.estado;
        }
        return this.inscripcionRepository.save(inscripcion);
    }
};
exports.AdministradorService = AdministradorService;
exports.AdministradorService = AdministradorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(curso_entity_1.Curso)),
    __param(2, (0, typeorm_1.InjectRepository)(profesor_entity_1.Profesor)),
    __param(3, (0, typeorm_1.InjectRepository)(inscripcion_entity_1.Inscripcion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdministradorService);
//# sourceMappingURL=administrador.service.js.map