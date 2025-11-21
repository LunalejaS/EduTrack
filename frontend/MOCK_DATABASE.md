# 🗄️ Mock Database - Simulación de Base de Datos

Este archivo simula una base de datos completa en JSON para que puedas probar el frontend sin necesidad de tener el backend NestJS ejecutándose.

## 🚀 Cómo Usar

### Opción 1: Modo Mock (Sin Backend)
Abre `js/api.js` y asegúrate de que:
```javascript
const USE_MOCK_DB = true; // ✅ Usar base de datos simulada
```

Luego simplemente abre `index.html` en tu navegador.

### Opción 2: Modo Backend Real
Cuando tengas el backend ejecutándose:
```javascript
const USE_MOCK_DB = false; // ❌ Usar backend real
```

## 📊 Datos Precargados

### Usuarios (7 usuarios)
- **1 Administrador**: Ana García (ana.garcia@edutrack.com)
- **2 Profesores**: 
  - Carlos Rodríguez - Matemáticas
  - María Fernández - Física
- **4 Estudiantes**: Juan, Laura, Pedro, Sofia

### Cursos (4 cursos)
- Cálculo Diferencial e Integral (60h)
- Álgebra Lineal (45h)
- Física Cuántica (50h)
- Programación Avanzada (55h)

### Inscripciones (5 inscripciones)
Con diferentes estados: aprobado, pendiente, reprobado

## 🔧 Características

✅ **Simula delay de red** (100-400ms) para experiencia realista
✅ **Validación de permisos** para operaciones de admin
✅ **Relaciones automáticas** entre entidades
✅ **CRUD completo** para todas las entidades
✅ **IDs auto-incrementales**

## 📝 Notas

- Los datos persisten solo durante la sesión (se reinician al recargar)
- Para persistencia real, usa el backend con PostgreSQL
- Los emails de admin válidos están configurados en `api.js`

## 🔄 Cambiar entre Mock y Backend

**Sin cerrar el navegador:**
1. Abre la consola de desarrollador (F12)
2. Cambia el valor: `api.useMock = false`
3. Recarga la página

**Permanente:**
1. Edita `frontend/js/api.js`
2. Cambia `const USE_MOCK_DB = true/false`
3. Guarda y recarga
