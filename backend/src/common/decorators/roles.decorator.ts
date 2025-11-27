//Decorador para especificar que roles pueden acceder a una ruta
import { SetMetadata } from "@nestjs/common";
import { RolUsuario } from "src/enums/rol-usuario.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolUsuario[]) => SetMetadata(ROLES_KEY, roles);