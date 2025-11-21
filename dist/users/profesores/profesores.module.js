"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfesoresModule = void 0;
const common_1 = require("@nestjs/common");
const profesores_service_1 = require("./profesores.service");
const profesores_controller_1 = require("./profesores.controller");
const typeorm_1 = require("@nestjs/typeorm");
const profesor_entity_1 = require("../../entities/profesor.entity");
const usuario_entity_1 = require("../../entities/usuario.entity");
let ProfesoresModule = class ProfesoresModule {
};
exports.ProfesoresModule = ProfesoresModule;
exports.ProfesoresModule = ProfesoresModule = __decorate([
    (0, common_1.Module)({
        controllers: [profesores_controller_1.ProfesoresController],
        providers: [profesores_service_1.ProfesoresService],
        imports: [typeorm_1.TypeOrmModule.forFeature([profesor_entity_1.Profesor, usuario_entity_1.Usuario])],
    })
], ProfesoresModule);
//# sourceMappingURL=profesores.module.js.map