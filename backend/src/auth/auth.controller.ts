//Controlador de Autenticación

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registrer.dto';

@Controller('auth')
export class AuthController {
    //inyección de dependencias
    constructor(
        private readonly authService: AuthService
    ){}

    //Endpoint de Registro
    @Post('register')
    async register(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto);
    }

    //Endpoint de Inicio de sesión
    @Post('login')
    async login(@Body() body: { email: string; contrasena: string }){
        //Extracción de credenciales
        const { email, contrasena } = body;
        return this.authService.login(email, contrasena);
    }
}