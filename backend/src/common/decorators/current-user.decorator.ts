//Decoradot para obtener el usuario actual desde el request
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Usuario } from "src/users/entities/usuario.entity";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): Usuario => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);