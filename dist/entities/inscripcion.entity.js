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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inscripcion = exports.EstadoInscripcion = void 0;
const typeorm_1 = require("typeorm");
const estudiante_entity_1 = require("./estudiante.entity");
const curso_entity_1 = require("./curso.entity");
var EstadoInscripcion;
(function (EstadoInscripcion) {
    EstadoInscripcion["PENDIENTE"] = "pendiente";
    EstadoInscripcion["APROBADO"] = "aprobado";
    EstadoInscripcion["REPROBADO"] = "reprobado";
})(EstadoInscripcion || (exports.EstadoInscripcion = EstadoInscripcion = {}));
let Inscripcion = class Inscripcion {
    id;
    fecha_inscripcion;
    nota;
    estado;
    estudiante;
    curso;
};
exports.Inscripcion = Inscripcion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inscripcion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Inscripcion.prototype, "fecha_inscripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Object)
], Inscripcion.prototype, "nota", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoInscripcion,
        default: EstadoInscripcion.PENDIENTE,
    }),
    __metadata("design:type", String)
], Inscripcion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estudiante_entity_1.Estudiante, (estudiante) => estudiante.inscripciones, { nullable: false }),
    __metadata("design:type", estudiante_entity_1.Estudiante)
], Inscripcion.prototype, "estudiante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => curso_entity_1.Curso, (curso) => curso.inscripciones, { nullable: false }),
    __metadata("design:type", curso_entity_1.Curso)
], Inscripcion.prototype, "curso", void 0);
exports.Inscripcion = Inscripcion = __decorate([
    (0, typeorm_1.Entity)()
], Inscripcion);
//# sourceMappingURL=inscripcion.entity.js.map