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
exports.AdministradorController = void 0;
const common_1 = require("@nestjs/common");
const administrador_service_1 = require("./administrador.service");
const asignar_curso_dto_1 = require("./dto/asignar-curso.dto");
const actualizar_estado_inscripcion_dto_1 = require("./dto/actualizar-estado-inscripcion.dto");
const swagger_1 = require("@nestjs/swagger");
let AdministradorController = class AdministradorController {
    administradorService;
    constructor(administradorService) {
        this.administradorService = administradorService;
    }
    asignarCurso(email, asignarCursoDto) {
        return this.administradorService.asignarCurso(email, asignarCursoDto);
    }
    actualizarEstadoInscripcion(email, asignarCursoDto) {
        return this.administradorService.actualizarEstadoInscripcion(email, asignarCursoDto);
    }
};
exports.AdministradorController = AdministradorController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Asignar un curso a un profesor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Curso asignado correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos o conflicto de asignación' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Profesor o curso no encontrado' }),
    (0, common_1.Patch)('asignar-curso'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, asignar_curso_dto_1.AsignarCursoDto]),
    __metadata("design:returntype", void 0)
], AdministradorController.prototype, "asignarCurso", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar el estado de una inscripción' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estado actualizado correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inscripción no encontrada' }),
    (0, common_1.Patch)('inscripciones/estado'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, actualizar_estado_inscripcion_dto_1.ActualizarEstadoInscropcionDto]),
    __metadata("design:returntype", void 0)
], AdministradorController.prototype, "actualizarEstadoInscripcion", null);
exports.AdministradorController = AdministradorController = __decorate([
    (0, swagger_1.ApiTags)('Administración'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [administrador_service_1.AdministradorService])
], AdministradorController);
//# sourceMappingURL=administracion.controller.js.map