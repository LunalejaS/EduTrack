export declare enum RolUsuario {
    ESTUDIANTE = "estudiante",
    PROFESOR = "profesor",
    ADMINISTRADOR = "administrador"
}
export declare class Usuario {
    id: number;
    nombre_completo: string;
    email: string;
    contrasena: string;
    rol: RolUsuario;
    administradores: any;
}
