"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminEmails = getAdminEmails;
exports.esEmailAceptadoAdmin = esEmailAceptadoAdmin;
function getAdminEmails() {
    const raw = process.env.ADMIN_EMAILS || '';
    return raw.split(',').map(email => email.trim().toLowerCase());
}
function esEmailAceptadoAdmin(email) {
    if (!email) {
        return false;
    }
    const admins = getAdminEmails();
    return admins.includes(email.toLowerCase());
}
//# sourceMappingURL=admin-emails.config.js.map