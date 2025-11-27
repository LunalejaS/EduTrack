import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolUsuario } from 'src/enums/rol-usuario.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ){}

    canActivate(context: ExecutionContext): boolean {
        //Obtener los roles requeridos del decorador @Roles()
        const requiredRoles = this.reflector.getAllAndOverride<RolUsuario[]>(ROLES_KEY, [ context.getHandler(), context.getClass()]);

        //Si no hay roles requeridos, se permite el acceso
        if(!requiredRoles){
            return true;
        }

        //Obtener el usuario del request
        const { user } = context.switchToHttp().getRequest();

        //Verficar si el usuario tiene alguno de los roles requeridos
        const hasRole = requiredRoles.some((role) => user.rol === role);
        if(!hasRole){
            throw new ForbiddenException(" No tienes permisos para acceder a esta acción.");
        }

        return true;
    }
}