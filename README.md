# 💻✨ EduTrack - Sistema de Gestión Educativa

**Autor:** Luna A. Sandoval 🩷

**Versión:** 1.0

**Colaboración:** Cristian Bonilla (Fronted)

Sistema completo de gestión educativa con autenticación basada en roles, gestión de cursos e inscripciones para estudiantes, profesores y administradores.


❗Importante: No todas las funcionalidades estan enlazadas al front.


---
## 🌷 Características
### Autenticación y Autorización
- Registro e inicio de sesión con JWT
- Asignación automática de roles según email/dominio
- Guards de autenticación y autorización por roles
- Tokens con expiración de 1 hora
### Gestión de Usuarios
- Tres tipos de usuarios: **Estudiantes**, **Profesores** y **Administradores**
- Dashboard personalizado según rol
- Perfil de usuario con información específica por rol
### Gestión de Cursos
- CRUD completo de cursos
- Asignación de profesores a cursos
- Filtros: cursos activos, próximos, finalizados
- Cupo máximo configurable (por defecto 20 estudiantes)
- Fechas de inicio y fin
### Sistema de Inscripciones
- Estudiantes se inscriben a cursos (estado: PENDIENTE)
- Profesor/Admin acepta o rechaza inscripciones
- Asignación de notas (rango 0.0 - 5.0)
- Estadísticas por curso
- Límite de 5 cursos simultáneos por estudiante
###  Características Adicionales
- Validación de fechas (no inscribirse a cursos iniciados)
- Ver estudiantes inscritos por curso


## 🌷Tecnologías
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

| Tecnología | Descripción |
|-----------|-------------|
| **NestJS** | Framework backend progresivo |
| **TypeScript** | Lenguaje de programación |
| **TypeORM** | ORM para TypeScript/JavaScript |
| **PostgreSQL** | Base de datos relacional |
| **Passport JWT** | Autenticación con JWT |
| **Class Validator** | Validación de DTOs |
| **Swagger** | Documentación de API |
| **Bcrypt** | Hash de contraseñas |


## 🌷 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
- **Node.js** ([Descargar](https://nodejs.org/))
- **npm** (incluido con Node.js)
- **PostgreSQL**([Descargar](https://www.postgresql.org/download/))
- **Git** ([Descargar](https://git-scm.com/))
### Verificar instalaciones:
```bash
node --version
npm --version
psql --version
git --version
```

## 🌷 Instalación
### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/edutrack-backend.git
cd edutrack-backend
```
### 2. Instalar dependencias
```bash
npm install
```
### 3. Crear base de datos PostgreSQL

Abre PostgreSQL y ejecuta:
```sql
CREATE DATABASE edutrack;
```
O desde la terminal:
```bash
psql -U postgres
CREATE DATABASE edutrack;
\q
```


## 🌷 Configuración
### 1. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:
```bash
touch .env
```
### 2. Configurar el archivo `.env`
Copia y modifica según tu configuración:
```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña_postgresql
DB_DATABASE=edutrack
DB_SYNCHRONIZE=true
DB_LOGGING=false
# JWT
JWT_SECRET=tu_clave_secreta_super_segura_cambiar_en_produccion
# Roles automáticos
# Emails de administradores (separados por comas)
ADMIN_EMAILS=admin@edutrack.com,admin2@edutrack.com
# Dominios de profesores (separados por comas)
PROFESOR_DOMAINS=universidad.edu.co,colegio.edu.co
# Entorno
NODE_ENV=development
```
### 3. Configuración de roles automáticos
**Reglas de asignación:**
| Email/Dominio | Rol Asignado |
|--------------|--------------|
| Email en `ADMIN_EMAILS` | **ADMINISTRADOR** |
| Dominio en `PROFESOR_DOMAINS` | **PROFESOR** |
| Otros emails | **ESTUDIANTE** (por defecto) |
**Ejemplos:**
- `admin@edutrack.com` → ADMINISTRADOR
- `maria@universidad.edu.co` → PROFESOR
- `juan@gmail.com` → ESTUDIANTE


## 🌷 Ejecución
### Modo Desarrollo
```bash
npm run start:dev
```
La aplicación estará disponible en:
- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/api/docs
### Modo Producción
```bash
# Compilar
npm run build

# Ejecutar
npm run start:prod
```
### Otros comandos útiles
```bash
# Ejecutar en modo debug
npm run start:debug
# Linter
npm run lint
# Formatear código
npm run format
```


## 🌷 Documentación API

### Endpoints Principales
#### Autenticación
```http
POST   /auth/register        # Registrar usuario
POST   /auth/login           # Iniciar sesión
```
#### Usuarios
```http
GET    /usuarios/perfil                # Ver mi perfil
GET    /usuarios/dashboard/info        # Dashboard personalizado
GET    /usuarios                       # Listar todos (admin)
GET    /usuarios/:id                   # Ver usuario (admin)
DELETE /usuarios/remove/estudiante/:id # Eliminar estudiante (admin, profesor)
DELETE /usuarios/remove/profesor/:id   # Eliminar profesor (admin)
DELETE /usuarios/remove/:id            # Eliminar usuario (admin)
```
#### Cursos
```http
POST   /cursos                       # Crear curso (admin)
GET    /cursos                       # Listar todos
GET    /cursos/activos               # Cursos activos
GET    /cursos/mis-cursos            # Mis cursos (profesor)
GET    /cursos/:id                   # Ver curso
PATCH  /cursos/:id                   # Actualizar curso
DELETE /cursos/:id                   # Eliminar curso (admin)
```
#### Inscripciones
```http
POST   /inscripciones                        # Inscribirse (estudiante)
GET    /inscripciones/mis-inscripciones      # Mis inscripciones
GET    /inscripciones/curso/:cursoId         # Inscripciones de curso
PATCH  /inscripciones/:id/estado             # Aceptar/rechazar
PATCH  /inscripciones/:id/nota               # Asignar nota
DELETE /inscripciones/:id                    # Eliminar inscripción
```


## 🌷 Estructura del Proyecto
```
edutrack-backend/
├── src/
│   ├── auth/                      # Módulo de autenticación
│   │   ├── dto/                   # DTOs de auth
│   │   ├── strategies/            # JWT Strategy
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── users/                     # Módulo de usuarios
│   │   ├── entities/              # Entidades (Usuario, Estudiante, Profesor)
│   │   ├── dto/                   # DTOs de usuarios
│   │   ├── usuarios.controller.ts
│   │   ├── usuarios.service.ts
│   │   ├── estudiantes.service.ts
│   │   ├── profesores.service.ts
│   │   └── users.module.ts
│   │
│   ├── courses/                   # Módulo de cursos
│   │   ├── entities/              # Entidad Curso
│   │   ├── dto/                   # DTOs de cursos
│   │   ├── cursos.controller.ts
│   │   ├── cursos.service.ts
│   │   └── courses.module.ts
│   │
│   ├── enrollments/               # Módulo de inscripciones
│   │   ├── entities/              # Entidad Inscripcion
│   │   ├── dto/                   # DTOs de inscripciones
│   │   ├── enrollments.controller.ts
│   │   ├── enrollments.service.ts
│   │   └── enrollments.module.ts
│   │
│   ├── common/                    # Recursos compartidos
│   │   ├── decorators/            # Decoradores personalizados
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   └── guards/                # Guards de seguridad
│   │       ├── auth.guard.ts
│   │       └── roles.guard.ts
│   │
│   ├── enums/                     # Enumeraciones
│   │   ├── rol-usuario.enum.ts
│   │   ├── estado-inscripcion.enum.ts
│   │   └── materia-profesor.enum.ts
│   │
│   ├── app.module.ts              # Módulo principal
│   ├── main.ts                    # Punto de entrada
│   └── ormconfig.ts               # Configuración TypeORM
│
├── .env                           # Variables de entorno (no subir a Git)
├── .env.example                   # Ejemplo de variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```


## 🌷 Roles y Permisos

| Funcionalidad | Estudiante | Profesor | Administrador |
|--------------|:----------:|:--------:|:-------------:|
| Registrarse/Login | ✅ | ✅ | ✅ |
| Ver perfil propio | ✅ | ✅ | ✅ |
| Ver dashboard personalizado | ✅ | ✅ | ✅ |
| Ver lista de cursos | ✅ | ✅ | ✅ |
| Inscribirse a cursos | ✅ | ❌ | ❌ |
| Ver mis inscripciones | ✅ | ❌ | ❌ |
| Ver mis cursos (profesor) | ❌ | ✅ | ✅ |
| Aceptar/rechazar inscripciones | ❌ | ✅ | ✅ |
| Asignar notas | ❌ | ✅ | ✅ |
| Crear cursos | ❌ | ❌ | ✅ |
| Editar/eliminar cursos | ❌ | ✅* | ✅ |
| Ver todos los usuarios | ❌ | ❌ | ✅ |
| Asignar profesores a cursos | ❌ | ❌ | ✅ |

*El profesor solo puede editar sus propios cursos

## 🌷 Capturas de Funcionamiento del Sistema
### Página de Inicio
<img width="1897" height="1019" alt="image" src="https://github.com/user-attachments/assets/2701d714-bb4e-4fe8-8709-e5db0b6c8f6b" />

### Registrarse
<img width="1893" height="1022" alt="image" src="https://github.com/user-attachments/assets/26c1d490-4762-4e3f-a90d-83f17ec23f7f" />

### Inicio de Sesión
<img width="1892" height="1012" alt="image" src="https://github.com/user-attachments/assets/9a4641b0-6a45-41d9-9614-e0b32679b500" />

### Vista de Cursos Disponibles
<img width="1898" height="1032" alt="image" src="https://github.com/user-attachments/assets/4759e3cc-20e4-424c-ab81-26239f650a13" />

### Vista de Dashboard (Admin)
<img width="1905" height="1019" alt="image" src="https://github.com/user-attachments/assets/88f0b8d4-7e69-45f2-9717-51c980742d07" />

### Vista de Perfil de Usaurio
<img width="1893" height="1020" alt="image" src="https://github.com/user-attachments/assets/09a0830d-777a-4148-bdfe-e2fb3dd0c918" />

### Vista de Dashboard (Estudiante)
<img width="1894" height="1004" alt="image" src="https://github.com/user-attachments/assets/acb1208b-885a-4c74-982a-02566377f10f" />

### ⚙️Funcionalidades que no estan en el Front:
### Cambiar de estado una inscripción
<img width="1865" height="1129" alt="image" src="https://github.com/user-attachments/assets/05c1a1de-52cd-403a-bd63-23ba777fee7e" />

### Crear Curso
<img width="1918" height="1194" alt="image" src="https://github.com/user-attachments/assets/813863f6-f0d2-47ff-bdfe-78434fe318ac" />

### Modificar curso
<img width="1857" height="1112" alt="image" src="https://github.com/user-attachments/assets/7301dac5-0c4c-44b0-bc84-df258954ba12" />

### Obtener cursos de un profesor especifico
<img width="1917" height="1132" alt="image" src="https://github.com/user-attachments/assets/a2cf4110-d0e1-4d3d-87e4-7395cd29850f" />
