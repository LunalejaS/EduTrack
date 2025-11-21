// Módulo de Inscripciones
const inscripcionesModule = {
    inscripciones: [],
    estudiantes: [],
    cursos: [],
    currentEstado: 'todos',

    async init() {
        await this.loadData();
        this.setupEventListeners();
    },

    async loadData() {
        try {
            const [inscripciones, usuarios, cursos] = await Promise.all([
                api.getInscripciones(),
                api.getUsuarios(),
                api.getCursos()
            ]);

            this.inscripciones = inscripciones;
            this.estudiantes = usuarios.filter(u => u.rol === 'estudiante');
            this.cursos = cursos;
            
            this.renderInscripciones();
        } catch (error) {
            console.error('Error loading data:', error);
            utils.showToast('Error al cargar datos', 'error');
        }
    },

    renderInscripciones(inscripcionesToRender = null) {
        const tbody = document.getElementById('inscripcionesTableBody');
        
        let filtered = inscripcionesToRender || this.inscripciones;
        
        // Filtrar por estado
        if (this.currentEstado !== 'todos') {
            filtered = filtered.filter(i => i.estado === this.currentEstado);
        }

        if (!filtered || filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 48px;">
                        <div class="empty-state">
                            <i class="fas fa-clipboard-list"></i>
                            <h3>No hay inscripciones</h3>
                            <p>Comienza inscribiendo estudiantes a cursos</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(inscripcion => `
            <tr>
                <td>${inscripcion.id}</td>
                <td>
                    <strong>${utils.escapeHtml(inscripcion.estudiante?.usuario?.nombre_completo || 'N/A')}</strong>
                </td>
                <td>${utils.escapeHtml(inscripcion.curso?.nombre || 'N/A')}</td>
                <td>${utils.formatDateShort(inscripcion.fecha_inscripcion)}</td>
                <td>
                    <span class="badge ${inscripcion.estado}">${utils.capitalize(inscripcion.estado)}</span>
                </td>
                <td>${inscripcion.nota !== null ? inscripcion.nota : '-'}</td>
                <td>
                    <button class="btn btn-sm btn-outline view-inscripcion" data-id="${inscripcion.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary edit-inscripcion" data-id="${inscripcion.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-inscripcion" data-id="${inscripcion.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // Event listeners
        tbody.querySelectorAll('.view-inscripcion').forEach(btn => {
            btn.addEventListener('click', () => this.viewInscripcion(btn.dataset.id));
        });

        tbody.querySelectorAll('.edit-inscripcion').forEach(btn => {
            btn.addEventListener('click', () => this.editInscripcion(btn.dataset.id));
        });

        tbody.querySelectorAll('.delete-inscripcion').forEach(btn => {
            btn.addEventListener('click', () => this.deleteInscripcion(btn.dataset.id));
        });
    },

    setupEventListeners() {
        // Botón nueva inscripción
        document.getElementById('addInscripcionBtn').addEventListener('click', () => {
            this.showInscripcionModal();
        });

        // Filtros por estado
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentEstado = btn.dataset.estado;
                this.renderInscripciones();
            });
        });
    },

    showInscripcionModal(inscripcion = null) {
        const isEdit = !!inscripcion;
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');

        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${isEdit ? 'Editar Inscripción' : 'Nueva Inscripción'}</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="inscripcionForm">
                    <div class="form-group">
                        <label for="inscripcionEstudiante">
                            <i class="fas fa-user-graduate"></i> Estudiante
                        </label>
                        <select id="inscripcionEstudiante" required ${isEdit ? 'disabled' : ''}>
                            <option value="">Seleccionar estudiante...</option>
                            ${this.estudiantes.map(est => `
                                <option value="${est.id}" 
                                        ${inscripcion && inscripcion.estudiante?.id === est.id ? 'selected' : ''}>
                                    ${utils.escapeHtml(est.nombre_completo)}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="inscripcionCurso">
                            <i class="fas fa-book"></i> Curso
                        </label>
                        <select id="inscripcionCurso" required ${isEdit ? 'disabled' : ''}>
                            <option value="">Seleccionar curso...</option>
                            ${this.cursos.map(curso => `
                                <option value="${curso.id}" 
                                        ${inscripcion && inscripcion.curso?.id === curso.id ? 'selected' : ''}>
                                    ${utils.escapeHtml(curso.nombre)}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    ${isEdit ? `
                    <div class="form-group">
                        <label for="inscripcionEstado">
                            <i class="fas fa-check-circle"></i> Estado
                        </label>
                        <select id="inscripcionEstado">
                            <option value="pendiente" ${inscripcion.estado === 'pendiente' ? 'selected' : ''}>
                                Pendiente
                            </option>
                            <option value="aprobado" ${inscripcion.estado === 'aprobado' ? 'selected' : ''}>
                                Aprobado
                            </option>
                            <option value="reprobado" ${inscripcion.estado === 'reprobado' ? 'selected' : ''}>
                                Reprobado
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="inscripcionNota">
                            <i class="fas fa-star"></i> Nota (0-10)
                        </label>
                        <input type="number" id="inscripcionNota" min="0" max="10" step="0.1"
                               value="${inscripcion.nota !== null ? inscripcion.nota : ''}"
                               placeholder="Ej: 8.5">
                    </div>
                    ` : ''}
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline close-modal">Cancelar</button>
                <button class="btn btn-primary" id="saveInscripcionBtn">
                    <i class="fas fa-save"></i> ${isEdit ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        `;

        modal.classList.add('active');

        // Event listeners
        modalContent.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => modal.classList.remove('active'));
        });

        document.getElementById('saveInscripcionBtn').addEventListener('click', () => {
            this.saveInscripcion(inscripcion?.id);
        });
    },

    async saveInscripcion(id = null) {
        const data = {};

        if (!id) {
            // Nueva inscripción
            data.estudiante_id = parseInt(document.getElementById('inscripcionEstudiante').value);
            data.curso_id = parseInt(document.getElementById('inscripcionCurso').value);
        } else {
            // Editar inscripción
            data.estado = document.getElementById('inscripcionEstado').value;
            const notaValue = document.getElementById('inscripcionNota').value;
            data.nota = notaValue ? parseFloat(notaValue) : null;
        }

        try {
            if (id) {
                await api.updateInscripcion(id, data);
                utils.showToast('Inscripción actualizada exitosamente', 'success');
            } else {
                await api.createInscripcion(data);
                utils.showToast('Inscripción creada exitosamente', 'success');
            }

            document.getElementById('modal').classList.remove('active');
            await this.loadData();
        } catch (error) {
            console.error('Error saving inscripcion:', error);
            utils.showToast('Error al guardar inscripción', 'error');
        }
    },

    async viewInscripcion(id) {
        try {
            const inscripcion = await api.getInscripcion(id);
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modalContent');

            modalContent.innerHTML = `
                <div class="modal-header">
                    <h2>Detalles de Inscripción</h2>
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label><i class="fas fa-hashtag"></i> ID</label>
                        <p>${inscripcion.id}</p>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-user-graduate"></i> Estudiante</label>
                        <p>${utils.escapeHtml(inscripcion.estudiante?.usuario?.nombre_completo || 'N/A')}</p>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-book"></i> Curso</label>
                        <p>${utils.escapeHtml(inscripcion.curso?.nombre || 'N/A')}</p>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-calendar"></i> Fecha de Inscripción</label>
                        <p>${utils.formatDate(inscripcion.fecha_inscripcion)}</p>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-check-circle"></i> Estado</label>
                        <p><span class="badge ${inscripcion.estado}">${utils.capitalize(inscripcion.estado)}</span></p>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-star"></i> Nota</label>
                        <p>${inscripcion.nota !== null ? inscripcion.nota : 'Sin calificar'}</p>
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
            console.error('Error viewing inscripcion:', error);
            utils.showToast('Error al cargar inscripción', 'error');
        }
    },

    editInscripcion(id) {
        const inscripcion = this.inscripciones.find(i => i.id == id);
        if (inscripcion) {
            this.showInscripcionModal(inscripcion);
        }
    },

    async deleteInscripcion(id) {
        if (!await utils.confirm('¿Estás seguro de eliminar esta inscripción?')) {
            return;
        }

        try {
            await api.deleteInscripcion(id);
            utils.showToast('Inscripción eliminada exitosamente', 'success');
            await this.loadData();
        } catch (error) {
            console.error('Error deleting inscripcion:', error);
            utils.showToast('Error al eliminar inscripción', 'error');
        }
    }
};
