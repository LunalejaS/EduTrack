//Servicio de Autenticación y verifiación

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsuariosService } from 'src/users/usuarios.service';
import { RegisterDto } from './dto/registrer.dto';
import { ConfigService } from '@nestjs/config';
import { RolUsuario } from 'src/enums/rol-usuario.enum';
import { EstudiantesService } from 'src/users/estudiantes.service';
import { ProfesoresService } from 'src/users/profesores.service';

@Injectable()
export class AuthService {
    //Inyección de Dependencias
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly profesoresService: ProfesoresService,
        private readonly estudiantesService: EstudiantesService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    //Registrarse
    async register(registerDto: RegisterDto){
          const existe = await this.usuariosService.findByEmail(registerDto.email);
        if (existe) {
            throw new BadRequestException('El email ya está registrado.');
        }

        const rolAsignado = this.determinarRolInicial(registerDto.email);

        const hash = await bcrypt.hash(registerDto.contrasena, 10);

        // Crear usuario base
        const usuario = await this.usuariosService.create({
            ...registerDto,
            contrasena: hash,
            rol: rolAsignado,
        });

        // Crear registro asociado según el rol
        if (rolAsignado === RolUsuario.ESTUDIANTE) {
            await this.estudiantesService.create({
                usuario,
                ano_ingreso: registerDto.ano_ingreso ? Number(registerDto.ano_ingreso) : new Date().getFullYear(),
            });
        }

        if (rolAsignado === RolUsuario.PROFESOR) {
            await this.profesoresService.create({
                usuario,
                especialidad: registerDto.especialidad ?? null,
            });
        }

        return {
            message: 'Usuario creado con éxito.',
            usuario,
        };
    }
        
    private determinarRolInicial(email: string): RolUsuario {
        //Obtener correos de admins desde el .env
        const adminEmails = this.configService.get<string>('ADMIN_EMAILS')?.split(',').map(e => e.trim()) || [];
        //Obtener dominios para profesores
        const profesorDomains = this.configService.get<string>('PROFESOR_DOMAINS')?.split(',').map(d => d.trim()) || [];

        //Validación si es correo de Administrador
        if(adminEmails.includes(email)){
            //Se le asigna rol de Administrador
            return RolUsuario.ADMINISTRADOR;
        }

        //Verificación si el correo contiene un dominio de profesor
        //Extraemos el dominio del correo
        const emailDomain = email.split('@')[1];
        if(profesorDomains.includes(emailDomain)){
            //Se le asigna rol de Profesor
            return RolUsuario.PROFESOR;
        }

        //Por defecto el rol asignado es estudiante
        return RolUsuario.ESTUDIANTE;
    }

    //Iniciar sesión
    async login(email: string, contrasena: string){
        //Verificar que el usuario (Asociado a ese email) existe
        const usuario = await this.usuariosService.findByEmail(email);
        if(!usuario){
            throw new UnauthorizedException(" Credenciales inválidas.");
        }
        
        //Verificación de contraseña
        const valid = await bcrypt.compare(contrasena, usuario.contrasena);
        if(!valid){
            throw new UnauthorizedException(" Credenciales inválidas.")
        }

        //Creación del playload del token
        const payload = {
            sub: usuario.id,
            rol: usuario.rol,
        };

        //Generamos el token JWT
        const token = await this.jwtService.signAsync(payload);

        //Se retorna el token y los datos del usuario
        return{
            access_token: token,
            usuario,
        };
    }
}
