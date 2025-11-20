//DTO para actualizar un usuario

import { PartialType } from "@nestjs/mapped-types";
import { CreateUsuarioDto } from "./create-usuario.dto";

// Extendemos CreateUsuarioDto para que todas las propiedades sean opcionales
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}