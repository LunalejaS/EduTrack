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
exports.ProfesoresController = void 0;
const common_1 = require("@nestjs/common");
const profesores_service_1 = require("./profesores.service");
const create_profesore_dto_1 = require("./dto/create-profesore.dto");
const update_profesore_dto_1 = require("./dto/update-profesore.dto");
const swagger_1 = require("@nestjs/swagger");
let ProfesoresController = class ProfesoresController {
    profesoresService;
    constructor(profesoresService) {
        this.profesoresService = profesoresService;
    }
    create(createProfesoreDto) {
        return this.profesoresService.create(createProfesoreDto);
    }
    findAll() {
        return this.profesoresService.findAll();
    }
    findOne(id) {
        return this.profesoresService.findOne(id);
    }
    update(id, updateProfesoreDto) {
        return this.profesoresService.update(id, updateProfesoreDto);
    }
    remove(id) {
        return this.profesoresService.remove(id);
    }
};
exports.ProfesoresController = ProfesoresController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo usuario que tiene como rol "profesor".' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Profesor creado correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profesore_dto_1.CreateProfesoreDto]),
    __metadata("design:returntype", void 0)
], ProfesoresController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los profesores' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de Profesores obtenida' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfesoresController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un profesor por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profesor encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Profesor no encontrado' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfesoresController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un profesor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profesor Actualizado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Profesor no encontrado' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_profesore_dto_1.UpdateProfesoreDto]),
    __metadata("design:returntype", void 0)
], ProfesoresController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un profesor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profesor eliminado con éxito' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Profesor no encontrado' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfesoresController.prototype, "remove", null);
exports.ProfesoresController = ProfesoresController = __decorate([
    (0, swagger_1.ApiTags)('Profesores'),
    (0, common_1.Controller)('profesores'),
    __metadata("design:paramtypes", [profesores_service_1.ProfesoresService])
], ProfesoresController);
//# sourceMappingURL=profesores.controller.js.map