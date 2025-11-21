// Módulo de Usuarios
const usuariosModule = {
    usuarios: [],
    currentTab: 'todos',

    async init() {
        await this.loadUsuarios();
        this.setupEventListeners();
    },

    async loadUsuarios() {
        try {
            this.usuarios = await api.getUsuarios();
            this.renderUsuarios();
        } catch (error) {
            console.error('Error loading usuarios:', error);
            utils.showToast('Error al cargar usuarios', 'error');
        }
    },

    renderUsuarios(usuariosToRender = null) {
        const tbody = document.getElementById('usuariosTableBody');
        
        // Filtrar por tab actual
        let filtered = usuariosToRender || this.usuarios;
        if (this.currentTab !== 'todos') {
            filtered = filtered.filter(u => u.rol === this.currentTab.slice(0, -1)); // Remove 's' from plural
        }

        if (!filtered || filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 48px;">
                        <div class="empty-state">
                            <i class="fas fa-users"></i>
                            <h3>No hay usuarios</h3>
                            <p>Comienza agregando usuarios al sistema</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(usuario => `
            <tr>
                <td>${usuario.id}</td>
                <td>
                    <strong>${utils.escapeHtml(usuario.nombre_completo)}</strong>
                </td>
                <td>${utils.escapeHtml(usuario.email)}</td>
                <td>
                    <span class="badge ${usuario.rol}">${utils.capitalize(usuario.rol)}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline view-usuario" data-id="${usuario.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary edit-usuario" data-id="${usuario.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-usuario" data-id="${usuario.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // Event listeners
        tbody.querySelectorAll('.view-usuario').forEach(btn => {
            btn.addEventListener('click', () => this.viewUsuario(btn.dataset.id));
        });

        tbody.querySelectorAll('.edit-usuario').forEach(btn => {
            btn.addEventListener('click', () => this.editUsuario(btn.dataset.id));
        });

        tbody.querySelectorAll('.delete-usuario').forEach(btn => {
            btn.addEventListener('click', () => this.deleteUsuario(btn.dataset.id));
        });
    },

    setupEventListeners() {
        // Botón nuevo usuario
        document.getElementById('addUsuarioBtn').addEventListener('click', () => {
            this.showUsuarioModal();
        });

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTab = btn.dataset.tab;
                this.renderUsuarios();
            });
        });

        // Búsqueda
        const searchInput = document.getElementById('searchUsuarios');
        searchInput.addEventListener('input', utils.debounce((e) => {
            const filtered = utils.filterBySearch(
                this.usuarios,
                e.target.value,
                ['nombre_completo', 'email', 'rol']
            );
            this.renderUsuarios(filtered);
        }, 300));
    },

    showUsuarioModal(usuario = null) {
        const isEdit = !!usuario;
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');

        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="usuarioForm">
                    <div class="form-group">
                        <label for="usuarioNombre">
                            <i class="fas fa-user"></i> Nombre Completo
                        </label>
                        <input type="text" id="usuarioNombre" required 
                               value="${usuario ? utils.escapeHtml(usuario.nombre_completo) : ''}"
                               placeholder="Ej: Juan Pérez">
                    </div>
                    <div class="form-group">
                        <label for="usuarioEmail">
                            <i class="fas fa-envelope"></i> Email
                        </label>
                        <input type="email" id="usuarioEmail" required 
                               value="${usuario ? utils.escapeHtml(usuario.email) : ''}"
                               placeholder="usuario@ejemplo.com">
                    </div>
                    ${!isEdit ? `
                    <div class="form-group">
                        <label for="usuarioPassword">
                            <i class="fas fa-lock"></i> Contraseña
                        </label>
                        <input type="password" id="usuarioPassword" required 
                               placeholder="••••••••">
                    </div>
                    ` : ''}
                    <div class="form-group">
                        <label for="usuarioRol">
                            <i class="fas fa-user-tag"></i> Rol
                        </label>
                        <select id="usuarioRol" required>
                            <option value="">Seleccionar rol...</option>
                            <option value="estudiante" ${usuario?.rol === 'estudiante' ? 'selected' : ''}>
                                Estudiante
                            </option>
                            <option value="profesor" ${usuario?.rol === 'profesor' ? 'selected' : ''}>
                                Profesor
                            </option>
                            <option value="administrador" ${usuario?.rol === 'administrador' ? 'selected' : ''}>
                                Administrador
                            </option>
                        </select>
                    </div>
                    <div id="extraFields"></div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline close-modal">Cancelar</button>
                <button class="btn btn-primary" id="saveUsuarioBtn">
                    <i class="fas fa-save"></i> ${isEdit ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        `;

        modal.classList.add('active');

        // Event listeners
        modalContent.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => modal.classList.remove('active');
        });

        // Campos adicionales según rol
        const rolSelect = document.getElementById('usuarioRol');
        const extraFields = document.getElementById('extraFields');

        rolSelect.addEventListener('change', (e) => {
            const rol = e.target.value;
            if (rol === 'estudiante') {
                extraFields.innerHTML = `
                    <div class="form-group">
                        <label for="anoIngreso">
                            <i class="fas fa-calendar"></i> Año de Ingreso
                        </label>
                        <input type="text" id="anoIngreso" placeholder="Ej: 2024">
                    </div>
                `;
            } else if (rol === 'profesor') {
                extraFields.innerHTML = `
                    <div class="form-group">
                        <label for="especialidad">
                            <i class="fas fa-graduation-cap"></i> Especialidad
                        </label>
                        <input type="text" id="especialidad" placeholder="Ej: Matemáticas">
                    </div>
                `;
            } else {
                extraFields.innerHTML = '';
            }
        });

        // Trigger para cargar campos si es edición
        if (usuario) {
            rolSelect.dispatchEvent(new Event('change'));
        }

        document.getElementById('saveUsuarioBtn').addEventListener('click', () => {
            this.saveUsuario(usuario?.id);
        });
    },

    async saveUsuario(id = null) {
        const data = {
            nombre_completo: document.getElementById('usuarioNombre').value,
            email: document.getElementById('usuarioEmail').value,
            rol: document.getElementById('usuarioRol').value
        };

        if (!id) {
            data.contrasena = document.getElementById('usuarioPassword').value;
        }

        // Campos adicionales según rol
        if (data.rol === 'estudiante' && document.getElementById('anoIngreso')) {
            data.ano_ingreso = document.getElementById('anoIngreso').value;
        } else if (data.rol === 'profesor' && document.getElementById('especialidad')) {
            data.especialidad = document.getElementById('especialidad').value;
        }

        try {
            if (id) {
                await api.updateUsuario(id, data);
                utils.showToast('Usuario actualizado exitosamente', 'success');
            } else {
                await api.createUsuario(data);
                utils.showToast('Usuario creado exitosamente', 'success');
            }

            document.getElementById('modal').classList.remove('active');
            await this.loadUsuarios();
        } catch (error) {
            console.error('Error saving usuario:', error);
            utils.showToast('Error al guardar usuario', 'error');
        }
    },

    async viewUsuario(id) {
        try {
            const usuario = await api.getUsuario(id);
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modalContent');

            modalContent.innerHTML = `
                <div class="modal-header">
                    <h2>${utils.escapeHtml(usuario.nombre_completo)}</h2>
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <i class="fas fa-user-circle" style="font-size: 80px; color: var(--primary-color);"></i>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-envelope"></i> Email</label>
                        <p>${utils.escapeHtml(usuario.email)}</p>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-user-tag"></i> Rol</label>
                        <p><span class="badge ${usuario.rol}">${utils.capitalize(usuario.rol)}</span></p>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-hashtag"></i> ID</label>
                        <p>${usuario.id}</p>
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
            console.error('Error viewing usuario:', error);
            utils.showToast('Error al cargar usuario', 'error');
        }
    },

    editUsuario(id) {
        const usuario = this.usuarios.find(u => u.id == id);
        if (usuario) {
            this.showUsuarioModal(usuario);
        }
    },

    async deleteUsuario(id) {
        if (!await utils.confirm('¿Estás seguro de eliminar este usuario?')) {
            return;
        }

        try {
            await api.deleteUsuario(id);
            utils.showToast('Usuario eliminado exitosamente', 'success');
            await this.loadUsuarios();
        } catch (error) {
            console.error('Error deleting usuario:', error);
            utils.showToast('Error al eliminar usuario', 'error');
        }
    }
};
