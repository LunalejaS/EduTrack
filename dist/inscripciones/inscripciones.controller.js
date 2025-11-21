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
exports.InscripcionesController = void 0;
const common_1 = require("@nestjs/common");
const inscripciones_service_1 = require("./inscripciones.service");
const create_inscripcione_dto_1 = require("./dto/create-inscripcione.dto");
const update_inscripcione_dto_1 = require("./dto/update-inscripcione.dto");
const swagger_1 = require("@nestjs/swagger");
let InscripcionesController = class InscripcionesController {
    inscripcionesService;
    constructor(inscripcionesService) {
        this.inscripcionesService = inscripcionesService;
    }
    create(createInscripcioneDto) {
        return this.inscripcionesService.create(createInscripcioneDto);
    }
    findAll() {
        return this.inscripcionesService.findAll();
    }
    findOne(id) {
        return this.inscripcionesService.findOne(id);
    }
    update(id, updateInscripcioneDto) {
        return this.inscripcionesService.update(id, updateInscripcioneDto);
    }
    remove(id) {
        return this.inscripcionesService.remove(id);
    }
};
exports.InscripcionesController = InscripcionesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva Inscripción.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Inscripción creado correctamente' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inscripcione_dto_1.CreateInscripcioneDto]),
    __metadata("design:returntype", void 0)
], InscripcionesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las Inscripciones' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de Inscripciones obtenida' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InscripcionesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener Inscripción por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inscripción encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inscripción no encontrada' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InscripcionesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una Inscripción' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inscripción Actualizado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inscripción no encontrado' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_inscripcione_dto_1.UpdateInscripcioneDto]),
    __metadata("design:returntype", void 0)
], InscripcionesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una inscripción' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inscripción eliminada con éxito' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inscripción no encontrada' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InscripcionesController.prototype, "remove", null);
exports.InscripcionesController = InscripcionesController = __decorate([
    (0, swagger_1.ApiTags)('inscripciones'),
    (0, common_1.Controller)('inscripciones'),
    __metadata("design:paramtypes", [inscripciones_service_1.InscripcionesService])
], InscripcionesController);
//# sourceMappingURL=inscripciones.controller.js.map