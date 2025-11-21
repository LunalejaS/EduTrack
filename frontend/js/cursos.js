// Módulo de Cursos
const cursosModule = {
    cursos: [],
    profesores: [],

    async init() {
        await this.loadCursos();
        await this.loadProfesores();
        this.setupEventListeners();
    },

    async loadCursos() {
        try {
            this.cursos = await api.getCursos();
            this.renderCursos();
        } catch (error) {
            console.error('Error loading cursos:', error);
            utils.showToast('Error al cargar cursos', 'error');
        }
    },

    async loadProfesores() {
        try {
            const usuarios = await api.getUsuarios();
            this.profesores = usuarios.filter(u => u.rol === 'profesor');
        } catch (error) {
            console.error('Error loading profesores:', error);
        }
    },

    renderCursos(cursosToRender = this.cursos) {
        const grid = document.getElementById('cursosGrid');
        
        if (!cursosToRender || cursosToRender.length === 0) {
            utils.renderEmptyState(
                grid,
                'fa-book',
                'No hay cursos disponibles',
                'Comienza creando tu primer curso'
            );
            return;
        }

        grid.innerHTML = cursosToRender.map(curso => `
            <div class="course-card" data-id="${curso.id}">
                <div class="course-image" style="background: var(--background-light); color: var(--primary-color);">
                    <i class="fas fa-book"></i>
                </div>
                <div class="course-content">
                    <div class="course-header">
                        <h3 class="course-title">${utils.escapeHtml(curso.nombre)}</h3>
                        <div class="course-professor">
                            <i class="fas fa-chalkboard-teacher"></i>
                            <span>${curso.profesor ? utils.escapeHtml(curso.profesor.usuario?.nombre_completo || 'Sin asignar') : 'Sin asignar'}</span>
                        </div>
                    </div>
                    <p class="course-description">${utils.escapeHtml(curso.descripcion)}</p>
                    <div class="course-meta">
                        <span><i class="fas fa-clock"></i> ${curso.duracion_horas} horas</span>
                        <span><i class="fas fa-users"></i> ${curso.inscripciones?.length || 0} estudiantes</span>
                    </div>
                    <div class="course-actions">
                        <button class="btn btn-sm btn-outline view-curso" data-id="${curso.id}">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                        <button class="btn btn-sm btn-primary edit-curso" data-id="${curso.id}">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-sm btn-danger delete-curso" data-id="${curso.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Event listeners para acciones
        grid.querySelectorAll('.view-curso').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.viewCurso(btn.dataset.id);
            });
        });

        grid.querySelectorAll('.edit-curso').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editCurso(btn.dataset.id);
            });
        });

        grid.querySelectorAll('.delete-curso').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteCurso(btn.dataset.id);
            });
        });
    },

    setupEventListeners() {
        // Botón nuevo curso
        document.getElementById('addCursoBtn').addEventListener('click', () => {
            this.showCursoModal();
        });

        // Búsqueda
        const searchInput = document.getElementById('searchCursos');
        searchInput.addEventListener('input', utils.debounce((e) => {
            const filtered = utils.filterBySearch(
                this.cursos,
                e.target.value,
                ['nombre', 'descripcion', 'profesor.usuario.nombre_completo']
            );
            this.renderCursos(filtered);
        }, 300));
    },

    showCursoModal(curso = null) {
        const isEdit = !!curso;
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');

        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${isEdit ? 'Editar Curso' : 'Nuevo Curso'}</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="cursoForm">
                    <div class="form-group">
                        <label for="cursoNombre">
                            <i class="fas fa-book"></i> Nombre del Curso
                        </label>
                        <input type="text" id="cursoNombre" required 
                               value="${curso ? utils.escapeHtml(curso.nombre) : ''}"
                               placeholder="Ej: Matemáticas Avanzadas">
                    </div>
                    <div class="form-group">
                        <label for="cursoDescripcion">
                            <i class="fas fa-align-left"></i> Descripción
                        </label>
                        <textarea id="cursoDescripcion" required 
                                  placeholder="Describe el contenido del curso...">${curso ? utils.escapeHtml(curso.descripcion) : ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="cursoDuracion">
                            <i class="fas fa-clock"></i> Duración (horas)
                        </label>
                        <input type="number" id="cursoDuracion" required min="1"
                               value="${curso ? curso.duracion_horas : ''}"
                               placeholder="Ej: 40">
                    </div>
                    <div class="form-group">
                        <label for="cursoProfesor">
                            <i class="fas fa-chalkboard-teacher"></i> Profesor
                        </label>
                        <select id="cursoProfesor" required>
                            <option value="">Seleccionar profesor...</option>
                            ${this.profesores.map(prof => `
                                <option value="${prof.id}" 
                                        ${curso && curso.profesor?.id === prof.id ? 'selected' : ''}>
                                    ${utils.escapeHtml(prof.nombre_completo)}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline close-modal">Cancelar</button>
                <button class="btn btn-primary" id="saveCursoBtn">
                    <i class="fas fa-save"></i> ${isEdit ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        `;

        modal.classList.add('active');

        // Event listeners
        modalContent.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => modal.classList.remove('active'));
        });

        document.getElementById('saveCursoBtn').addEventListener('click', () => {
            this.saveCurso(curso?.id);
        });
    },

    async saveCurso(id = null) {
        const data = {
            nombre: document.getElementById('cursoNombre').value,
            descripcion: document.getElementById('cursoDescripcion').value,
            duracion_horas: parseInt(document.getElementById('cursoDuracion').value),
            profesorId: parseInt(document.getElementById('cursoProfesor').value)
        };

        try {
            if (id) {
                await api.updateCurso(id, data);
                utils.showToast('Curso actualizado exitosamente', 'success');
            } else {
                await api.createCurso(data);
                utils.showToast('Curso creado exitosamente', 'success');
            }

            document.getElementById('modal').classList.remove('active');
            await this.loadCursos();
        } catch (error) {
            console.error('Error saving curso:', error);
            utils.showToast('Error al guardar curso', 'error');
        }
    },

    async viewCurso(id) {
        try {
            const curso = await api.getCurso(id);
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modalContent');

            modalContent.innerHTML = `
                <div class="modal-header">
                    <h2>${utils.escapeHtml(curso.nombre)}</h2>
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 24px;">
                        <div class="course-image" style="background: var(--background-light); color: var(--primary-color); height: 200px;">
                            <i class="fas fa-book"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-align-left"></i> Descripción</label>
                        <p>${utils.escapeHtml(curso.descripcion)}</p>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-clock"></i> Duración</label>
                        <p>${curso.duracion_horas} horas</p>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-chalkboard-teacher"></i> Profesor</label>
                        <p>${curso.profesor ? utils.escapeHtml(curso.profesor.usuario?.nombre_completo) : 'Sin asignar'}</p>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-users"></i> Estudiantes Inscritos</label>
                        <p>${curso.inscripciones?.length || 0}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline close-modal">Cerrar</button>
                </div>
            `;

            modal.classList.add('active');
            modalContent.querySelector('.close-modal').addEventListener('click', () => {
                modal.classList.remove('active');
            });
        } catch (error) {
            console.error('Error viewing curso:', error);
            utils.showToast('Error al cargar curso', 'error');
        }
    },

    editCurso(id) {
        const curso = this.cursos.find(c => c.id == id);
        if (curso) {
            this.showCursoModal(curso);
        }
    },

    async deleteCurso(id) {
        if (!await utils.confirm('¿Estás seguro de eliminar este curso?')) {
            return;
        }

        try {
            await api.deleteCurso(id);
            utils.showToast('Curso eliminado exitosamente', 'success');
            await this.loadCursos();
        } catch (error) {
            console.error('Error deleting curso:', error);
            utils.showToast('Error al eliminar curso', 'error');
        }
    }
};
