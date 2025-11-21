import { RolUsuario } from "src/entities/usuario.entity";
export declare class CreateUsuarioDto {
    nombre_completo: string;
    email: string;
    contrasena: string;
    rol: RolUsuario;
}
