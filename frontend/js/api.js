// API Service - Conexión con el backend NestJS
const API_BASE_URL = 'http://localhost:3000';
const USE_MOCK_DB = false; // Cambiar a true para usar mock database

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.useMock = USE_MOCK_DB;
    }

    // Helper para hacer peticiones HTTP reales
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error en la petición');
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Helper para peticiones simuladas
    async mockRequest(handler) {
        if (!this.useMock) {
            throw new Error('Mock DB is disabled');
        }
        
        await window.simulateNetworkDelay();
        
        try {
            return handler();
        } catch (error) {
            console.error('Mock API Error:', error);
            throw error;
        }
    }

    // === CURSOS ===
    async getCursos() {
        if (this.useMock) {
            return this.mockRequest(() => window.getCleanData(window.mockDB.cursos));
        }
        return this.request('/cursos');
    }

    async getCurso(id) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const curso = window.mockDB.cursos.find(c => c.id == id);
                if (!curso) throw new Error('Curso no encontrado');
                return window.getCleanData(curso);
            });
        }
        return this.request(`/cursos/${id}`);
    }

    async createCurso(data) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const profesor = window.mockDB.profesores.find(p => p.id == data.profesorId);
                if (!profesor) throw new Error('Profesor no encontrado');
                
                const nuevoCurso = {
                    id: window.nextCursoId(),
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    duracion_horas: data.duracion_horas,
                    profesor: profesor,
                    inscripciones: []
                };
                
                window.mockDB.cursos.push(nuevoCurso);
                return window.getCleanData(nuevoCurso);
            });
        }
        return this.request('/cursos', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateCurso(id, data) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const curso = window.mockDB.cursos.find(c => c.id == id);
                if (!curso) throw new Error('Curso no encontrado');
                
                if (data.nombre) curso.nombre = data.nombre;
                if (data.descripcion) curso.descripcion = data.descripcion;
                if (data.duracion_horas) curso.duracion_horas = data.duracion_horas;
                if (data.profesorId) {
                    const profesor = window.mockDB.profesores.find(p => p.id == data.profesorId);
                    if (profesor) curso.profesor = profesor;
                }
                
                return window.getCleanData(curso);
            });
        }
        return this.request(`/cursos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteCurso(id) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const index = window.mockDB.cursos.findIndex(c => c.id == id);
                if (index === -1) throw new Error('Curso no encontrado');
                
                window.mockDB.cursos.splice(index, 1);
                return { message: `Curso con ID ${id} eliminado` };
            });
        }
        return this.request(`/cursos/${id}`, {
            method: 'DELETE',
        });
    }

    // === USUARIOS ===
    async getUsuarios() {
        if (this.useMock) {
            return this.mockRequest(() => window.getCleanData(window.mockDB.usuarios));
        }
        return this.request('/users');
    }

    async getUsuario(id) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const usuario = window.mockDB.usuarios.find(u => u.id == id);
                if (!usuario) throw new Error('Usuario no encontrado');
                return window.getCleanData(usuario);
            });
        }
        return this.request(`/users/${id}`);
    }

    async createUsuario(data) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const nuevoUsuario = {
                    id: window.nextUserId(),
                    nombre_completo: data.nombre_completo,
                    email: data.email,
                    contrasena: data.contrasena,
                    rol: data.rol
                };
                
                window.mockDB.usuarios.push(nuevoUsuario);
                
                // Si es estudiante o profesor, crear registro adicional
                if (data.rol === 'estudiante' && data.ano_ingreso) {
                    window.mockDB.estudiantes.push({
                        id: nuevoUsuario.id,
                        ano_ingreso: data.ano_ingreso,
                        usuario: nuevoUsuario,
                        inscripciones: []
                    });
                } else if (data.rol === 'profesor' && data.especialidad) {
                    window.mockDB.profesores.push({
                        id: nuevoUsuario.id,
                        especialidad: data.especialidad,
                        usuario: nuevoUsuario,
                        cursos: []
                    });
                }
                
                return window.getCleanData(nuevoUsuario);
            });
        }
        return this.request('/users', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateUsuario(id, data) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const usuario = window.mockDB.usuarios.find(u => u.id == id);
                if (!usuario) throw new Error('Usuario no encontrado');
                
                if (data.nombre_completo) usuario.nombre_completo = data.nombre_completo;
                if (data.email) usuario.email = data.email;
                if (data.rol) usuario.rol = data.rol;
                
                return window.getCleanData(usuario);
            });
        }
        return this.request(`/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteUsuario(id) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const index = window.mockDB.usuarios.findIndex(u => u.id == id);
                if (index === -1) throw new Error('Usuario no encontrado');
                
                window.mockDB.usuarios.splice(index, 1);
                
                // Eliminar de estudiantes o profesores si aplica
                const estIndex = window.mockDB.estudiantes.findIndex(e => e.id == id);
                if (estIndex !== -1) window.mockDB.estudiantes.splice(estIndex, 1);
                
                const profIndex = window.mockDB.profesores.findIndex(p => p.id == id);
                if (profIndex !== -1) window.mockDB.profesores.splice(profIndex, 1);
                
                return { message: `Usuario con ID ${id} eliminado` };
            });
        }
        return this.request(`/users/${id}`, {
            method: 'DELETE',
        });
    }

    // === INSCRIPCIONES ===
    async getInscripciones() {
        if (this.useMock) {
            return this.mockRequest(() => window.getCleanData(window.mockDB.inscripciones));
        }
        return this.request('/inscripciones');
    }

    async getInscripcion(id) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const inscripcion = window.mockDB.inscripciones.find(i => i.id == id);
                if (!inscripcion) throw new Error('Inscripción no encontrada');
                return window.getCleanData(inscripcion);
            });
        }
        return this.request(`/inscripciones/${id}`);
    }

    async createInscripcion(data) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const estudiante = window.mockDB.estudiantes.find(e => e.id == data.estudiante_id);
                const curso = window.mockDB.cursos.find(c => c.id == data.curso_id);
                
                if (!estudiante) throw new Error('Estudiante no encontrado');
                if (!curso) throw new Error('Curso no encontrado');
                
                const nuevaInscripcion = {
                    id: window.nextInscripcionId(),
                    fecha_inscripcion: new Date().toISOString().split('T')[0],
                    nota: null,
                    estado: 'pendiente',
                    estudiante: estudiante,
                    curso: curso
                };
                
                window.mockDB.inscripciones.push(nuevaInscripcion);
                
                // Actualizar referencias
                if (!curso.inscripciones) curso.inscripciones = [];
                curso.inscripciones.push(nuevaInscripcion);
                
                if (!estudiante.inscripciones) estudiante.inscripciones = [];
                estudiante.inscripciones.push(nuevaInscripcion);
                
                return window.getCleanData(nuevaInscripcion);
            });
        }
        return this.request('/inscripciones', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateInscripcion(id, data) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const inscripcion = window.mockDB.inscripciones.find(i => i.id == id);
                if (!inscripcion) throw new Error('Inscripción no encontrada');
                
                if (data.nota !== undefined) inscripcion.nota = data.nota;
                if (data.estado) inscripcion.estado = data.estado;
                
                return window.getCleanData(inscripcion);
            });
        }
        return this.request(`/inscripciones/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteInscripcion(id) {
        if (this.useMock) {
            return this.mockRequest(() => {
                const index = window.mockDB.inscripciones.findIndex(i => i.id == id);
                if (index === -1) throw new Error('Inscripción no encontrada');
                
                window.mockDB.inscripciones.splice(index, 1);
                return { message: `Inscripción con ID ${id} eliminada` };
            });
        }
        return this.request(`/inscripciones/${id}`, {
            method: 'DELETE',
        });
    }

    // === ADMINISTRACIÓN ===
    async asignarCurso(email, data) {
        if (this.useMock) {
            return this.mockRequest(() => {
                // Validar que el email sea de un admin
                const adminEmails = ['ana.garcia@edutrack.com', 'adminEdutrack@test.com', 'adminEdutrack2@test.com'];
                if (!adminEmails.includes(email)) {
                    throw new Error('No tienes permisos de administrador');
                }
                
                const curso = window.mockDB.cursos.find(c => c.id == data.curso_id);
                const profesor = window.mockDB.profesores.find(p => p.id == data.profesor_id);
                
                if (!curso) throw new Error('Curso no encontrado');
                if (!profesor) throw new Error('Profesor no encontrado');
                
                curso.profesor = window.deepClone(profesor);
                
                return { 
                    message: 'Curso asignado exitosamente',
                    curso: window.getCleanData(curso)
                };
            });
        }
        return this.request(`/admin/asignar-curso?email=${email}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async actualizarEstadoInscripcion(email, data) {
        if (this.useMock) {
            return this.mockRequest(() => {
                // Validar que el email sea de un admin
                const adminEmails = ['ana.garcia@edutrack.com', 'adminEdutrack@test.com', 'adminEdutrack2@test.com'];
                if (!adminEmails.includes(email)) {
                    throw new Error('No tienes permisos de administrador');
                }
                
                const inscripcion = window.mockDB.inscripciones.find(i => i.id == data.inscripcion_id);
                if (!inscripcion) throw new Error('Inscripción no encontrada');
                
                if (data.nota !== undefined) inscripcion.nota = data.nota;
                if (data.estado) inscripcion.estado = data.estado;
                
                return {
                    message: 'Inscripción actualizada exitosamente',
                    inscripcion: window.getCleanData(inscripcion)
                };
            });
        }
        return this.request(`/admin/inscripciones/estado?email=${email}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}

// Instancia global
const api = new ApiService();
