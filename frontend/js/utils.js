// Utilidades generales
const utils = {
    // Mostrar notificación toast
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toast.className = `toast ${type}`;
        toastMessage.textContent = message;
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    },

    // Formatear fecha
    formatDate(date) {
        if (!date) return '-';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Formatear fecha corta
    formatDateShort(date) {
        if (!date) return '-';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES');
    },

    // Capitalizar primera letra
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // Validar email
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Obtener usuario actual
    getCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Guardar usuario actual
    setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },

    // Verificar si es admin
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.rol === 'administrador';
    },

    // Verificar si es profesor
    isProfesor() {
        const user = this.getCurrentUser();
        return user && user.rol === 'profesor';
    },

    // Verificar si es estudiante
    isEstudiante() {
        const user = this.getCurrentUser();
        return user && user.rol === 'estudiante';
    },

    // Escapar HTML para prevenir XSS
    escapeHtml(text) {
        if (text == null) return ' ';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    },

    // Debounce para búsquedas
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Filtrar array por texto de búsqueda
    filterBySearch(items, searchText, fields) {
        if (!searchText) return items;
        
        const search = searchText.toLowerCase();
        return items.filter(item => {
            return fields.some(field => {
                const value = this.getNestedValue(item, field);
                return value && value.toString().toLowerCase().includes(search);
            });
        });
    },

    // Obtener valor anidado de objeto (ej: "profesor.nombre")
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    },

    // Confirmar acción
    async confirm(message) {
        return window.confirm(message);
    },

    // Cargar estado vacío
    renderEmptyState(container, icon, title, message) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas ${icon}"></i>
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
        `;
    }
};
