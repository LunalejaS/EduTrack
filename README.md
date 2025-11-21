# EduTrack — Sistema de Gestión Académica

**Autor:** Luna A. Sandoval

**Versión:** 0.2

Backend construido con NestJS, TypeORM y PostgreSQL, diseñado para gestionar usuarios, profesores, estudiantes, cursos e inscripciones.
Incluye documentación con Swagger, validaciones con class-validator, DTOs estructurados y arquitectura basada en Módulo–Servicio–Controlador.

---
## Tecnologías utilizadas

- Node.js v11.01.10
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Swagger
- class-validator / class-transformer

--
## Requisitos previos
Antes de iniciar, asegúrate de tener instalado:
- Node.js (v11 o mayor)
- NPM
- PostgreSQL
- Git
- Nest CLI

  `npm i -g @nestjs/cli`

---
## Instalación
1. Clona el repositorio

   `git clone <url-del-repo>`
   `cd EduTrack`
   
3. Instala dependencias
   `npm install`
   
4. Configura tu archivo `.env`

   Usa el archivo `.env.template incluido.`

- ### Variables de Entorno
  Crea un archivo `.env` basado en:
      
      .env.template
      DB_HOST=
      DB_PORT=
      DB_USER=
      DB_PASSWORD=
      DB_NAME=

      ADMIN_EMAILS=admin1@test.com,admin2@test.com
      PORT=3000

Edítalo con tus valores reales.
