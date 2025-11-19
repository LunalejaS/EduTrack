# EduTrack - Backend NestJS

**Autor:** Luna Leja  
**Fecha:** 18/11/2025  
**Versión:** 0.1 - Primera entrega

---

## Descripción
EduTrack es un sistema de gestión académica que permite manejar usuarios (profesores y estudiantes), cursos e inscripciones.  
Actualmente, el backend está desarrollado en **NestJS** con **TypeORM** y **PostgreSQL** como base de datos.

---

## Tecnologías
- Node.js / NestJS
- TypeScript
- PostgreSQL
- TypeORM
- class-validator (para validaciones DTO)
- bcrypt (para encriptar contraseñas)

---

## Estructura del proyecto
```
src/
|-- entities/
|   |-- usuario.entity.ts
|   |-- profesor.entity.ts
|   |-- estudiante.entity.ts
|   |-- curso.entity.ts
|   `-- inscripcion.entity.ts
|-- users/
|   |-- dto/
|   |   |-- create-usuario.dto.ts
|   |   |-- update-usuario.dto.ts
|   |   |-- update-estudiante.dto.ts
|   |   `-- update-profesor.dto.ts
|   |-- usuarios.controller.ts
|   `-- usuarios.service.ts
|-- cursos/
|   `-- dto/
|       `-- create-curso.dto.ts
|-- inscripciones/
|   `-- dto/
|       `-- create-inscripcion.dto.ts
`-- app.module.ts
```

---

## Entidades implementadas

### Usuario
- `id`
- `nombre_completo`
- `email` (único)
- `contrasena` (hasheada)
- `rol` (`estudiante` / `profesor`)

### Profesor (extiende Usuario)
- `id`
- `especialidad`
- relación con Usuario

### Estudiante (extiende Usuario)
- `id`
- `ano_ingreso`
- relación con Usuario

### Curso
- `id`
- `nombre`
- `descripcion`
- `creditos`
- `profesor_id` (relación con Profesor)

### Inscripción
- `id`
- `fecha_inscripcion`
- `nota`
- `estudiante_id` (relación con Estudiante)
- `curso_id` (relación con Curso)

---

## DTOs implementados
- `CreateUsuarioDto`
- `UpdateUsuarioDto`
- `UpdateEstudianteDto`
- `UpdateProfesorDto`
- `CreateCursoDto`
- `CreateInscripcionDto`

---

## Configuración

1. Instalar dependencias:
   ```bash```
  `npm install`
3. Configurar archivo .env con los datos de PostgreSQL:
  `DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=tu_usuario
  DB_PASSWORD=tu_contraseña
  DB_NAME=nombre_base`
4. Levantar la aplicación:
  ```bash```
  `npm run start:dev`
    La app correrá en `http://localhost:3000`

---

## Endpoints disponibles (Usuarios)
- `POST /usuarios`
- `GET /usuarios`
- `GET /usuarios/:id`
- `PATCH /usuarios/:id`
- `DELETE /usuarios/:id`
- 
- Los endpoints de Curso e Inscripción se implementarán en la siguiente entrega.

