// API Configuration
const API_URL = 'http://localhost:3000';

// State Management
const state = {
    user: null,
    token: null,
    courses: [],
    enrollments: [],
    currentSection: 'home'
};

// Load state from localStorage
function loadState() {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
        state.token = savedToken;
        state.user = JSON.parse(savedUser);
        updateUI();
    }
}

// Save state to localStorage
function saveState() {
    if (state.token) {
        localStorage.setItem('token', state.token);
        localStorage.setItem('user', JSON.stringify(state.user));
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initializeEventListeners();
    
    // Load courses on homepage
    if (!state.user) {
        loadCourses();
    }
});

// Event Listeners
function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateToSection(section);
        });
    });

    // Auth buttons
    document.getElementById('btnLogin')?.addEventListener('click', () => openModal('loginModal'));
    document.getElementById('btnRegister')?.addEventListener('click', () => openModal('registerModal'));
    document.getElementById('btnLogout')?.addEventListener('click', logout);
    
    // User menu
    document.getElementById('btnUserMenu')?.addEventListener('click', toggleUserMenu);
    
    // Modal switches
    document.getElementById('switchToRegister')?.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('loginModal');
        openModal('registerModal');
    });
    
    document.getElementById('switchToLogin')?.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('registerModal');
        openModal('loginModal');
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-overlay')) {
                closeAllModals();
            }
        });
    });

    // Forms
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('registerForm')?.addEventListener('submit', handleRegister);

    // Hero actions
    document.getElementById('btnExplore')?.addEventListener('click', () => navigateToSection('courses'));
    
    // Filter tabs
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterCourses(filter);
            
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

// Navigation
function navigateToSection(sectionName) {
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionName) {
            link.classList.add('active');
        }
    });

    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`${sectionName}Section`);
    if (targetSection) {
        targetSection.classList.add('active');
        state.currentSection = sectionName;
        
        // Load data for specific sections
        if (sectionName === 'courses') {
            loadCourses();
        } else if (sectionName === 'dashboard' && state.user) {
            loadDashboard();
        } else if (sectionName === 'profile' && state.user) {
            loadProfile();
        }
    }
}

// Modal Management
function openModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function toggleUserMenu() {
    document.getElementById('dropdownMenu')?.classList.toggle('hidden');
}

// Authentication
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const contrasena = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contrasena })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            state.token = data.access_token;
            state.user = data.usuario;
            saveState();
            updateUI();
            closeModal('loginModal');
            showToast('¡Bienvenido! Has iniciado sesión correctamente', 'success');
            navigateToSection('dashboard');
        } else {
            showError('loginError', data.message || 'Credenciales inválidas');
        }
    } catch (error) {
        showError('loginError', 'Error al conectar con el servidor');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const nombre_completo = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const contrasena = document.getElementById('registerPassword').value;
    const ano_ingreso = document.getElementById('registerYear').value || new Date().getFullYear().toString();
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre_completo, email, contrasena, ano_ingreso })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('¡Cuenta creada! Ahora puedes iniciar sesión', 'success');
            closeModal('registerModal');
            openModal('loginModal');
            document.getElementById('loginEmail').value = email;
        } else {
            showError('registerError', data.message || 'Error al crear la cuenta');
        }
    } catch (error) {
        showError('registerError', 'Error al conectar con el servidor');
    }
}

function logout() {
    state.user = null;
    state.token = null;
    state.enrollments = [];
    saveState();
    updateUI();
    navigateToSection('home');
    showToast('Sesión cerrada correctamente', 'success');
}

// UI Updates
function updateUI() {
    const isLoggedIn = !!state.user;
    
    // Toggle auth buttons
    document.getElementById('btnLogin').classList.toggle('hidden', isLoggedIn);
    document.getElementById('btnRegister').classList.toggle('hidden', isLoggedIn);
    document.getElementById('userMenu').classList.toggle('hidden', !isLoggedIn);
    
    if (isLoggedIn) {
        document.getElementById('userName').textContent = state.user.nombre_completo.split(' ')[0];
    }
}

// Courses
async function loadCourses() {
    const coursesList = document.getElementById('coursesList');
    coursesList.innerHTML = '<div class="loading">Cargando cursos...</div>';
    
    try {
        const headers = state.token ? {
            'Authorization': `Bearer ${state.token}`
        } : {};
        
        const response = await fetch(`${API_URL}/cursos`, { headers });
        const data = await response.json();
        
        if (response.ok) {
            state.courses = data.cursos || [];
            renderCourses(state.courses);
        } else {
            coursesList.innerHTML = '<div class="empty-state"><p>Error al cargar los cursos</p></div>';
        }
    } catch (error) {
        coursesList.innerHTML = '<div class="empty-state"><p>Error al conectar con el servidor</p></div>';
    }
}

function renderCourses(courses) {
    const coursesList = document.getElementById('coursesList');
    
    if (courses.length === 0) {
        coursesList.innerHTML = '<div class="empty-state"><p>No hay cursos disponibles</p></div>';
        return;
    }
    
    coursesList.innerHTML = courses.map(course => `
        <div class="course-card" onclick="showCourseDetail(${course.id})">
            <div class="course-image">${course.nombre.charAt(0)}</div>
            <div class="course-content">
                <h3 class="course-title">${course.nombre}</h3>
                <p class="course-description">${course.descripcion || 'Sin descripción'}</p>
                <div class="course-meta">
                    <span class="course-professor">
                        ${course.profesor?.usuario?.nombre_completo || 'Sin profesor'}
                    </span>
                    <span class="badge badge-primary">${course.profesor?.especialidad || ''}</span>
                </div>
                <div class="course-dates mt-2">
                    ${formatDate(course.fecha_inicio)} - ${formatDate(course.fecha_fin)}
                </div>
            </div>
        </div>
    `).join('');
}

function filterCourses(filter) {
    let filteredCourses = state.courses;
    
    if (filter === 'active') {
        const today = new Date();
        filteredCourses = state.courses.filter(course => {
            const start = new Date(course.fecha_inicio);
            const end = new Date(course.fecha_fin);
            return start <= today && end >= today;
        });
    } else if (filter === 'upcoming') {
        const today = new Date();
        filteredCourses = state.courses.filter(course => {
            const start = new Date(course.fecha_inicio);
            return start > today;
        });
    }
    
    renderCourses(filteredCourses);
}

async function showCourseDetail(courseId) {
    const course = state.courses.find(c => c.id === courseId);
    if (!course) return;
    
    const content = document.getElementById('courseDetailContent');
    content.innerHTML = `
        <h2 class="modal-title">${course.nombre}</h2>
        <div class="mb-3">
            <span class="badge badge-primary">${course.profesor?.especialidad || ''}</span>
        </div>
        <p class="mb-3">${course.descripcion || 'Sin descripción disponible'}</p>
        <div class="info-row">
            <span class="info-label">Profesor:</span>
            <span class="info-value">${course.profesor?.usuario?.nombre_completo || 'Sin asignar'}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Inicio:</span>
            <span class="info-value">${formatDate(course.fecha_inicio)}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Fin:</span>
            <span class="info-value">${formatDate(course.fecha_fin)}</span>
        </div>
        ${state.user && state.user.rol === 'estudiante' ? `
            <button class="btn-primary btn-block mt-3" onclick="enrollInCourse(${course.id})">
                Inscribirse al Curso
            </button>
        ` : ''}
    `;
    
    openModal('courseModal');
}

async function enrollInCourse(cursoId) {
    if (!state.token) {
        showToast('Debes iniciar sesión para inscribirte', 'warning');
        closeAllModals();
        openModal('loginModal');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/inscripciones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ curso_id: cursoId })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('¡Inscripción exitosa! Estado: Pendiente de aprobación', 'success');
            closeAllModals();
            loadDashboard();
        } else {
            showToast(data.message || 'Error al inscribirse', 'error');
        }
    } catch (error) {
        showToast('Error al conectar con el servidor', 'error');
    }
}

// Dashboard
async function loadDashboard() {
    const dashboardContent = document.getElementById('dashboardContent');
    
    if (!state.user) {
        dashboardContent.innerHTML = `
            <div class="empty-state">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p>Inicia sesión para ver tu dashboard</p>
            </div>
        `;
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/usuarios/dashboard/info`, {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            renderDashboard(data);
        }
    } catch (error) {
        dashboardContent.innerHTML = '<div class="empty-state"><p>Error al cargar el dashboard</p></div>';
    }
}

function renderDashboard(data) {
    const dashboardContent = document.getElementById('dashboardContent');
    
    let statsHTML = '';
    let contentHTML = '';
    
    if (data.usuario.rol === 'estudiante') {
        statsHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Inscripciones</div>
                    <div class="stat-value">${data.total_inscripciones || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Año de Ingreso</div>
                    <div class="stat-value">${data.ano_ingreso || 'N/A'}</div>
                </div>
            </div>
        `;
        
        if (data.inscripciones && data.inscripciones.length > 0) {
            contentHTML = `
                <h3 class="mb-2">Mis Inscripciones</h3>
                <div class="enrollments-list">
                    ${data.inscripciones.map(ins => `
                        <div class="enrollment-item">
                            <div class="enrollment-info">
                                <h4>${ins.curso?.nombre || 'Curso'}</h4>
                                <p>${ins.curso?.profesor?.usuario?.nombre_completo || 'Sin profesor'}</p>
                            </div>
                            <div>
                                <span class="badge badge-${getStatusBadgeClass(ins.estado)}">${ins.estado}</span>
                                ${ins.nota ? `<p class="mt-1">Nota: ${ins.nota}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    } else if (data.usuario.rol === 'profesor') {
        statsHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Especialidad</div>
                    <div class="stat-value">${data.especialidad || 'N/A'}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Cursos</div>
                    <div class="stat-value">${data.total_cursos || 0}</div>
                </div>
            </div>
        `;
    } else if (data.usuario.rol === 'administrador') {
        statsHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Usuarios</div>
                    <div class="stat-value">${data.estadisticas?.total_usuarios || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Estudiantes</div>
                    <div class="stat-value">${data.estadisticas?.total_estudiantes || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Profesores</div>
                    <div class="stat-value">${data.estadisticas?.total_profesor || 0}</div>
                </div>
            </div>
        `;
    }
    
    dashboardContent.innerHTML = statsHTML + contentHTML;
}

// Profile
async function loadProfile() {
    const profileContent = document.getElementById('profileContent');
    
    if (!state.user) {
        profileContent.innerHTML = `
            <div class="empty-state">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p>Inicia sesión para ver tu perfil</p>
            </div>
        `;
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/usuarios/perfil`, {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            renderProfile(data.usuario);
        }
    } catch (error) {
        profileContent.innerHTML = '<div class="empty-state"><p>Error al cargar el perfil</p></div>';
    }
}

function renderProfile(user) {
    const profileContent = document.getElementById('profileContent');
    const initials = user.nombre_completo.split(' ').map(n => n[0]).join('').substring(0, 2);
    
    profileContent.innerHTML = `
        <div class="profile-card">
            <div class="profile-header">
                <div class="profile-avatar">${initials}</div>
                <h2 class="profile-name">${user.nombre_completo}</h2>
                <p class="profile-role">
                    <span class="badge badge-primary">${user.rol}</span>
                </p>
            </div>
            <div class="profile-info">
                <div class="info-row">
                    <span class="info-label">Email</span>
                    <span class="info-value">${user.email}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Rol</span>
                    <span class="info-value">${user.rol}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Fecha de Registro</span>
                    <span class="info-value">${formatDate(user.creado_en)}</span>
                </div>
            </div>
        </div>
    `;
}

// Utilities
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
        
        setTimeout(() => {
            errorEl.classList.add('hidden');
        }, 5000);
    }
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getStatusBadgeClass(status) {
    const classes = {
        'pendiente': 'warning',
        'aprobado': 'success',
        'rechazado': 'danger'
    };
    return classes[status] || 'primary';
}
