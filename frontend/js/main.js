// Main Application Script
let currentPage = 'dashboard';
let allUsuarios = [];

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar usuarios disponibles
    await loadAllUsuarios();
    
    // Verificar si hay usuario seleccionado
    checkAuth();
    
    // Setup navegación
    setupNavigation();
    
    // Setup user menu
    setupUserMenu();
    
    // Cargar datos iniciales del dashboard
    await loadDashboardData();
});

async function loadAllUsuarios() {
    try {
        allUsuarios = await api.getUsuarios();
    } catch (error) {
        console.error('Error loading usuarios:', error);
        allUsuarios = [];
    }
}

function checkAuth() {
    const currentUser = utils.getCurrentUser();
    const userSelectorPage = document.getElementById('userSelectorPage');
    const navbar = document.getElementById('navbar');
    const mainContent = document.querySelector('.main-content');

    if (!currentUser) {
        // Mostrar selector de usuario
        userSelectorPage.classList.remove('hidden');
        navbar.style.display = 'none';
        mainContent.style.display = 'none';
        setupUserSelector();
    } else {
        // Mostrar aplicación
        userSelectorPage.classList.add('hidden');
        navbar.style.display = 'block';
        mainContent.style.display = 'block';
        updateUserInfo(currentUser);
        
        // Mostrar/ocultar elementos según rol
        if (currentUser.rol === 'administrador') {
            document.querySelectorAll('.admin-only').forEach(el => {
                el.style.display = 'flex';
            });
        }
    }
}

function setupUserSelector() {
    const select = document.getElementById('selectUsuario');
    const form = document.getElementById('userSelectorForm');
    
    // Cargar usuarios en el select
    if (allUsuarios && allUsuarios.length > 0) {
        select.innerHTML = `
            <option value="">Selecciona un usuario...</option>
            ${allUsuarios.map(user => `
                <option value="${user.id}">
                    ${utils.escapeHtml(user.nombre_completo)} - ${utils.capitalize(user.rol)}
                </option>
            `).join('')}
        `;
    } else {
        select.innerHTML = '<option value="">No hay usuarios disponibles</option>';
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userId = document.getElementById('selectUsuario').value;
        if (!userId) {
            utils.showToast('Por favor selecciona un usuario', 'warning');
            return;
        }

        const selectedUser = allUsuarios.find(u => u.id == userId);
        if (selectedUser) {
            utils.setCurrentUser(selectedUser);
            utils.showToast(`Bienvenido, ${selectedUser.nombre_completo}`, 'success');
            
            // Recargar página para mostrar la aplicación
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    });
}

function updateUserInfo(user) {
    document.getElementById('userName').textContent = user.nombre_completo.split(' ')[0];
    document.getElementById('userNameFull').textContent = user.nombre_completo;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userRole').textContent = utils.capitalize(user.rol);
}

function setupUserMenu() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', () => {
        userDropdown.classList.remove('active');
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.reload();
    });
}

function setupNavigation() {
    // Links de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
        });
    });

    // Botones de navegación del dashboard
    document.querySelectorAll('[data-navigate]').forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo(btn.dataset.navigate);
        });
    });
}

async function navigateTo(page) {
    // Actualizar nav activo
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    // Mostrar página
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`${page}Page`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = page;
        
        // Cargar datos de la página
        await loadPageData(page);
    }
}

async function loadPageData(page) {
    try {
        switch (page) {
            case 'dashboard':
                await loadDashboardData();
                break;
            case 'cursos':
                await cursosModule.init();
                break;
            case 'usuarios':
                await usuariosModule.init();
                break;
            case 'inscripciones':
                await inscripcionesModule.init();
                break;
            case 'admin':
                await adminModule.init();
                break;
        }
    } catch (error) {
        console.error(`Error loading ${page}:`, error);
        utils.showToast(`Error al cargar ${page}`, 'error');
    }
}

async function loadDashboardData() {
    try {
        const [cursos, usuarios, inscripciones] = await Promise.all([
            api.getCursos(),
            api.getUsuarios(),
            api.getInscripciones()
        ]);

        // Actualizar estadísticas
        document.getElementById('totalCursos').textContent = cursos.length;
        document.getElementById('totalEstudiantes').textContent = 
            usuarios.filter(u => u.rol === 'estudiante').length;
        document.getElementById('totalProfesores').textContent = 
            usuarios.filter(u => u.rol === 'profesor').length;
        document.getElementById('totalInscripciones').textContent = inscripciones.length;
    } catch (error) {
        console.error('Error loading dashboard:', error);
        // No mostrar toast en dashboard para no ser intrusivo
    }
}

// Cerrar modal al hacer click fuera
document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        document.getElementById('modal').classList.remove('active');
    }
});

// Prevenir cierre al hacer click dentro del modal
document.getElementById('modalContent')?.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC para cerrar modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal');
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    }
});
