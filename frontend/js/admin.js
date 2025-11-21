// Módulo de Administración
const adminModule = {
    cursos: [],
    profesores: [],
    inscripciones: [],

    async init() {
        await this.loadData();
        this.setupEventListeners();
    },

    async loadData() {
        try {
            const [cursos, usuarios, inscripciones] = await Promise.all([
                api.getCursos(),
                api.getUsuarios(),
                api.getInscripciones()
            ]);

            this.cursos = cursos;
            this.profesores = usuarios.filter(u => u.rol === 'profesor');
            this.inscripciones = inscripciones;
        } catch (error) {
            console.error('Error loading admin data:', error);
            utils.showToast('Error al cargar datos', 'error');
        }
    },

    setupEventListeners() {
        // Asignar curso a profesor
        document.getElementById('asignarCursoBtn')?.addEventListener('click', () => {
            this.showAsignarCursoModal();
        });

        // Calificar inscripción
        document.getElementById('calificarInscripcionBtn')?.addEventListener('click', () => {
            this.showCalificarModal();
        });
    },

    showAsignarCursoModal() {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');
        const currentUser = utils.getCurrentUser();

        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>Asignar Curso a Profesor</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="asignarCursoForm">
                    <div class="form-group">
                        <label for="asignarCurso">
                            <i class="fas fa-book"></i> Curso
                        </label>
                        <select id="asignarCurso" required>
                            <option value="">Seleccionar curso...</option>
                            ${this.cursos.map(curso => `
                                <option value="${curso.id}">
                                    ${utils.escapeHtml(curso.nombre)}
                                    ${curso.profesor ? ' (Profesor: ' + utils.escapeHtml(curso.profesor.usuario?.nombre_completo) + ')' : ' (Sin profesor)'}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="asignarProfesor">
                            <i class="fas fa-chalkboard-teacher"></i> Nuevo Profesor
                        </label>
                        <select id="asignarProfesor" required>
                            <option value="">Seleccionar profesor...</option>
                            ${this.profesores.map(prof => `
                                <option value="${prof.id}">
                                    ${utils.escapeHtml(prof.nombre_completo)}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>
                            <i class="fas fa-info-circle"></i> Información
                        </label>
                        <p style="color: var(--text-medium); font-size: 14px;">
                            Esta acción asignará o reasignará el curso seleccionado al profesor indicado.
                            Se utilizará tu email de administrador: <strong>${currentUser?.email || 'N/A'}</strong>
                        </p>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline close-modal">Cancelar</button>
                <button class="btn btn-primary" id="saveAsignarCursoBtn">
                    <i class="fas fa-check"></i> Asignar
                </button>
            </div>
        `;

        modal.classList.add('active');

        modalContent.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => modal.classList.remove('active'));
        });

        document.getElementById('saveAsignarCursoBtn').addEventListener('click', () => {
            this.asignarCurso();
        });
    },

    async asignarCurso() {
        const cursoId = parseInt(document.getElementById('asignarCurso').value);
        const profesorId = parseInt(document.getElementById('asignarProfesor').value);
        const currentUser = utils.getCurrentUser();

        if (!currentUser || currentUser.rol !== 'administrador') {
            utils.showToast('Solo los administradores pueden realizar esta acción', 'error');
            return;
        }

        const data = {
            curso_id: cursoId,
            profesor_id: profesorId
        };

        try {
            await api.asignarCurso(currentUser.email, data);
            utils.showToast('Curso asignado exitosamente al profesor', 'success');
            document.getElementById('modal').classList.remove('active');
            await this.loadData();
        } catch (error) {
            console.error('Error asignando curso:', error);
            utils.showToast('Error al asignar curso', 'error');
        }
    },

    showCalificarModal() {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');
        const currentUser = utils.getCurrentUser();

        // Filtrar inscripciones con estudiante y curso
        const inscripcionesValidas = this.inscripciones.filter(
            i => i.estudiante && i.curso
        );

        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>Calificar Inscripción</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="calificarForm">
                    <div class="form-group">
                        <label for="calificarInscripcion">
                            <i class="fas fa-clipboard-list"></i> Inscripción
                        </label>
                        <select id="calificarInscripcion" required>
                            <option value="">Seleccionar inscripción...</option>
                            ${inscripcionesValidas.map(insc => `
                                <option value="${insc.id}">
                                    ${utils.escapeHtml(insc.estudiante.usuario?.nombre_completo || 'N/A')} - 
                                    ${utils.escapeHtml(insc.curso.nombre)} 
                                    (${utils.capitalize(insc.estado)})
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="calificarEstado">
                            <i class="fas fa-check-circle"></i> Estado
                        </label>
                        <select id="calificarEstado" required>
                            <option value="pendiente">Pendiente</option>
                            <option value="aprobado">Aprobado</option>
                            <option value="reprobado">Reprobado</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="calificarNota">
                            <i class="fas fa-star"></i> Nota (0-10)
                        </label>
                        <input type="number" id="calificarNota" min="0" max="10" step="0.1"
                               placeholder="Ej: 8.5">
                    </div>
                    <div class="form-group">
                        <label>
                            <i class="fas fa-info-circle"></i> Información
                        </label>
                        <p style="color: var(--text-medium); font-size: 14px;">
                            Actualiza el estado y/o nota de la inscripción seleccionada.
                            Se utilizará tu email de administrador: <strong>${currentUser?.email || 'N/A'}</strong>
                        </p>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline close-modal">Cancelar</button>
                <button class="btn btn-primary" id="saveCalificarBtn">
                    <i class="fas fa-save"></i> Guardar Calificación
                </button>
            </div>
        `;

        modal.classList.add('active');

        modalContent.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => modal.classList.remove('active'));
        });

        document.getElementById('saveCalificarBtn').addEventListener('click', () => {
            this.calificarInscripcion();
        });
    },

    async calificarInscripcion() {
        const inscripcionId = parseInt(document.getElementById('calificarInscripcion').value);
        const estado = document.getElementById('calificarEstado').value;
        const notaValue = document.getElementById('calificarNota').value;
        const currentUser = utils.getCurrentUser();

        if (!currentUser || currentUser.rol !== 'administrador') {
            utils.showToast('Solo los administradores pueden realizar esta acción', 'error');
            return;
        }

        const data = {
            idInscription: inscripcionId,
            estado: estado
        };

        if (notaValue) {
            data.nota = parseFloat(notaValue);
        }

        try {
            await api.actualizarEstadoInscripcion(currentUser.email, data);
            utils.showToast('Inscripción calificada exitosamente', 'success');
            document.getElementById('modal').classList.remove('active');
            await this.loadData();
        } catch (error) {
            console.error('Error calificando inscripcion:', error);
            utils.showToast('Error al calificar inscripción', 'error');
        }
    }
};
