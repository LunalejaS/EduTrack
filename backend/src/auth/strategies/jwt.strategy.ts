import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from 'src/users/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly usuariosService: UsuariosService,
    ) {
        super({
            //Extraer el token del header Authorization: Bearer <token>
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //No ignorar la expiración del token
            ignoreExpiration: false,
            //Clave secreta para verificar el token
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret_key', // Agregar valor por defecto
        });
    }

    //Validar el payload del token
    async validate(payload: any) {
        //Buscar el usuario por ID del payload
        const usuario = await this.usuariosService.findByID(payload.sub);
        
        if (!usuario) {
            throw new UnauthorizedException('Usuario no encontrado.');
        }

        //Retornar el usuario (se adjunta a request.user)
        return usuario;
    }
}