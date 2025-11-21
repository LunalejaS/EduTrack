//Config para leer emails permitidos para administradores

//Leer variable
export function getAdminEmails(): string[] {
    const raw = process.env.ADMIN_EMAILS || '';
    return raw.split(',').map(email => email.trim().toLowerCase());
}

//Función apra verificar email
export function esEmailAceptadoAdmin(email: string): boolean {
    if(!email){
        return false;
    }
    const admins = getAdminEmails();
    return admins.includes(email.toLowerCase());
}