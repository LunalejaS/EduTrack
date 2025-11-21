# 🎓 EduTrack Frontend

Frontend moderno y minimalista para el sistema de gestión educativa EduTrack.

## 🎨 Cambios de Diseño

### Paleta de Colores Actualizada
- **Primario**: `#3B82F6` (Azul moderno y profesional)
- **Secundario**: `#10B981` (Verde éxito)
- **Acento**: `#8B5CF6` (Morado elegante)
- **Warning**: `#F59E0B` (Naranja advertencia)
- **Danger**: `#EF4444` (Rojo error)

### Características Visuales
- ✅ Colores sólidos (sin gradientes)
- ✅ Diseño minimalista y limpio
- ✅ Sombras suaves y espaciado generoso
- ✅ Bordes redondeados consistentes
- ✅ Transiciones suaves

## 🔐 Sistema de Autenticación

**NO hay sistema de login tradicional.** En su lugar:

1. **Selector de Usuario**: Al cargar la aplicación, se muestra un selector con todos los usuarios de la base de datos
2. **Selección Directa**: Elige el usuario con el que deseas operar
3. **Sin Contraseñas**: No se requiere autenticación

### Validación de Admin
Para las operaciones administrativas, el sistema usa el **email del usuario actual** como query parameter en las peticiones al backend:

```javascript
// Ejemplo: Asignar curso a profesor
await api.asignarCurso(currentUser.email, {
  curso_id: 1,
  profesor_id: 2
});
```

El backend valida si el email corresponde a un administrador autorizado.

## 📁 Estructura de Archivos

```
frontend/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos completos
└── js/
    ├── api.js             # Servicio API (sin autenticación)
    ├── utils.js           # Utilidades
    ├── cursos.js          # Módulo de cursos
    ├── usuarios.js        # Módulo de usuarios
    ├── inscripciones.js   # Módulo de inscripciones
    ├── admin.js           # Panel de administración
    └── main.js            # Aplicación principal
```

## 🚀 Uso

### Modo 1: Con Base de Datos Simulada (Mock) 🎮

**Perfecto para desarrollo y pruebas sin backend:**

1. **Abre directamente el archivo:**
   ```bash
   # Simplemente abre index.html en tu navegador
   # O usa un servidor local:
   python -m http.server 8080
   # Luego abre: http://localhost:8080
   ```

2. **El mock está activado por defecto** con datos de ejemplo
   - 7 usuarios (1 admin, 2 profesores, 4 estudiantes)
   - 4 cursos precargados
   - 5 inscripciones de ejemplo

Ver [MOCK_DATABASE.md](MOCK_DATABASE.md) para más detalles.

#### 🔍 Inspector de Base de Datos

Para visualizar y gestionar los datos mock, abre:
```
db-inspector.html
```

Desde ahí podrás:
- Ver estadísticas en tiempo real
- Listar todos los usuarios, cursos e inscripciones
- Ver el JSON completo de la base de datos
- Resetear la base de datos a su estado inicial

### Modo 2: Con Backend Real 🚀

**Cuando quieras usar el backend NestJS real:**

1. **Desactiva el mock** en `js/api.js`:
   ```javascript
   const USE_MOCK_DB = false; // Cambiar a false
   ```

2. **Inicia el backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

3. **Abre el frontend:**
   ```bash
   cd frontend
   python -m http.server 8080
   ```

### 3. Seleccionar Usuario
1. Al cargar, verás un selector con todos los usuarios
2. Selecciona el usuario con el que deseas trabajar
3. El sistema cargará la interfaz con los permisos correspondientes

## 📊 Módulos Disponibles

### Dashboard
- Estadísticas generales
- Vista rápida del sistema

### Cursos
- CRUD completo de cursos
- Asignación de profesores
- Visualización de inscripciones

### Usuarios
- Gestión de estudiantes, profesores y administradores
- Filtrado por rol
- Creación con campos específicos por rol

### Inscripciones
- Sistema de inscripción de estudiantes a cursos
- Filtrado por estado (pendiente/aprobado/reprobado)
- Actualización de notas

### Administración (Solo Admins)
- Asignar/reasignar cursos a profesores
- Calificar inscripciones
- Visible solo para usuarios con rol "administrador"

## 🔧 Endpoints Consumidos

Todos los endpoints del backend NestJS:

### Cursos
- `GET /cursos` - Listar cursos
- `POST /cursos` - Crear curso
- `GET /cursos/:id` - Obtener curso
- `PATCH /cursos/:id` - Actualizar curso
- `DELETE /cursos/:id` - Eliminar curso

### Usuarios
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `GET /users/:id` - Obtener usuario
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Inscripciones
- `GET /inscripciones` - Listar inscripciones
- `POST /inscripciones` - Crear inscripción
- `GET /inscripciones/:id` - Obtener inscripción
- `PATCH /inscripciones/:id` - Actualizar inscripción
- `DELETE /inscripciones/:id` - Eliminar inscripción

### Administración
- `PATCH /admin/asignar-curso?email={email}` - Asignar curso a profesor
- `PATCH /admin/inscripciones/estado?email={email}` - Calificar inscripción

## 🎯 Características Técnicas

- **Responsive Design**: Funciona en desktop, tablet y móvil
- **Sin dependencias externas**: Solo Font Awesome para iconos
- **Vanilla JavaScript**: Sin frameworks, código limpio y simple
- **Modular**: Cada módulo está en su propio archivo
- **Toast Notifications**: Feedback visual para todas las acciones
- **Validación de Formularios**: HTML5 y JavaScript
- **Estados Vacíos**: Mensajes informativos cuando no hay datos

## 🎨 Personalización

Para cambiar colores, edita las variables CSS en `css/styles.css`:

```css
:root {
  --primary-color: #3B82F6;    /* Tu color primario */
  --secondary-color: #10B981;  /* Tu color secundario */
  --accent-color: #8B5CF6;     /* Tu color de acento */
  /* ... más variables */
}
```

## 📱 Navegación

- **Keyboard Shortcuts**: ESC para cerrar modales
- **Búsqueda en Tiempo Real**: En cursos y usuarios
- **Filtros Dinámicos**: Por rol en usuarios, por estado en inscripciones
- **User Menu**: Click en el avatar para ver info y cerrar sesión

## 🔄 Flujo de Trabajo

1. **Selecciona usuario** → Sistema carga permisos
2. **Navega** entre módulos usando la barra superior
3. **Realiza operaciones** CRUD según tu rol
4. **Recibe feedback** visual con notificaciones toast
5. **Cambia de usuario** cerrando sesión

---

**Desarrollado con ❤️ para EduTrack**
