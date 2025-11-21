// Mock Database - Simulación de base de datos en JSON
const mockDB = {
    usuarios: [
        {
            id: 1,
            nombre_completo: "Ana García Martínez",
            email: "ana.garcia@edutrack.com",
            contrasena: "password123",
            rol: "administrador"
        },
        {
            id: 2,
            nombre_completo: "Carlos Rodríguez López",
            email: "carlos.rodriguez@edutrack.com",
            contrasena: "password123",
            rol: "profesor"
        },
        {
            id: 3,
            nombre_completo: "María Fernández Torres",
            email: "maria.fernandez@edutrack.com",
            contrasena: "password123",
            rol: "profesor"
        },
        {
            id: 4,
            nombre_completo: "Juan Pérez Gómez",
            email: "juan.perez@estudiante.com",
            contrasena: "password123",
            rol: "estudiante"
        },
        {
            id: 5,
            nombre_completo: "Laura Sánchez Ruiz",
            email: "laura.sanchez@estudiante.com",
            contrasena: "password123",
            rol: "estudiante"
        },
        {
            id: 6,
            nombre_completo: "Pedro Martín Díaz",
            email: "pedro.martin@estudiante.com",
            contrasena: "password123",
            rol: "estudiante"
        },
        {
            id: 7,
            nombre_completo: "Sofia López Hernández",
            email: "sofia.lopez@estudiante.com",
            contrasena: "password123",
            rol: "estudiante"
        }
    ],
    
    estudiantes: [
        {
            id: 4,
            ano_ingreso: "2023",
            usuario: null // Se llenará dinámicamente
        },
        {
            id: 5,
            ano_ingreso: "2024",
            usuario: null
        },
        {
            id: 6,
            ano_ingreso: "2023",
            usuario: null
        },
        {
            id: 7,
            ano_ingreso: "2024",
            usuario: null
        }
    ],
    
    profesores: [
        {
            id: 2,
            especialidad: "Matemáticas",
            usuario: null // Se llenará dinámicamente
        },
        {
            id: 3,
            especialidad: "Física",
            usuario: null
        }
    ],
    
    cursos: [
        {
            id: 1,
            nombre: "Cálculo Diferencial e Integral",
            descripcion: "Curso fundamental de cálculo que cubre derivadas, integrales y sus aplicaciones en problemas del mundo real.",
            duracion_horas: 60,
            profesor: null, // Se llenará dinámicamente
            inscripciones: []
        },
        {
            id: 2,
            nombre: "Álgebra Lineal",
            descripcion: "Estudio de vectores, matrices, espacios vectoriales y transformaciones lineales con aplicaciones prácticas.",
            duracion_horas: 45,
            profesor: null,
            inscripciones: []
        },
        {
            id: 3,
            nombre: "Física Cuántica",
            descripcion: "Introducción a los principios fundamentales de la mecánica cuántica y sus aplicaciones modernas.",
            duracion_horas: 50,
            profesor: null,
            inscripciones: []
        },
        {
            id: 4,
            nombre: "Programación Avanzada",
            descripcion: "Técnicas avanzadas de programación, estructuras de datos complejas y algoritmos eficientes.",
            duracion_horas: 55,
            profesor: null,
            inscripciones: []
        }
    ],
    
    inscripciones: [
        {
            id: 1,
            fecha_inscripcion: "2024-01-15",
            nota: 8.5,
            estado: "aprobado",
            estudiante: null, // Se llenará dinámicamente
            curso: null
        },
        {
            id: 2,
            fecha_inscripcion: "2024-01-20",
            nota: null,
            estado: "pendiente",
            estudiante: null,
            curso: null
        },
        {
            id: 3,
            fecha_inscripcion: "2024-02-01",
            nota: 6.0,
            estado: "aprobado",
            estudiante: null,
            curso: null
        },
        {
            id: 4,
            fecha_inscripcion: "2024-02-05",
            nota: 4.5,
            estado: "reprobado",
            estudiante: null,
            curso: null
        },
        {
            id: 5,
            fecha_inscripcion: "2024-02-10",
            nota: null,
            estado: "pendiente",
            estudiante: null,
            curso: null
        }
    ]
};

// IDs auto-incrementales
let nextUserId = 8;
let nextCursoId = 5;
let nextInscripcionId = 6;

// Función para inicializar relaciones
function initializeMockDB() {
    // Relacionar estudiantes con usuarios
    mockDB.estudiantes.forEach(estudiante => {
        estudiante.usuario = mockDB.usuarios.find(u => u.id === estudiante.id);
    });
    
    // Relacionar profesores con usuarios
    mockDB.profesores.forEach(profesor => {
        profesor.usuario = mockDB.usuarios.find(u => u.id === profesor.id);
    });
    
    // Asignar profesores a cursos
    mockDB.cursos[0].profesor = mockDB.profesores[0]; // Cálculo -> Carlos (Matemáticas)
    mockDB.cursos[1].profesor = mockDB.profesores[0]; // Álgebra -> Carlos (Matemáticas)
    mockDB.cursos[2].profesor = mockDB.profesores[1]; // Física Cuántica -> María (Física)
    mockDB.cursos[3].profesor = mockDB.profesores[0]; // Programación -> Carlos
    
    // Asignar inscripciones
    mockDB.inscripciones[0].estudiante = mockDB.estudiantes[0]; // Juan en Cálculo
    mockDB.inscripciones[0].curso = mockDB.cursos[0];
    
    mockDB.inscripciones[1].estudiante = mockDB.estudiantes[1]; // Laura en Álgebra
    mockDB.inscripciones[1].curso = mockDB.cursos[1];
    
    mockDB.inscripciones[2].estudiante = mockDB.estudiantes[2]; // Pedro en Física
    mockDB.inscripciones[2].curso = mockDB.cursos[2];
    
    mockDB.inscripciones[3].estudiante = mockDB.estudiantes[0]; // Juan en Programación
    mockDB.inscripciones[3].curso = mockDB.cursos[3];
    
    mockDB.inscripciones[4].estudiante = mockDB.estudiantes[3]; // Sofia en Cálculo
    mockDB.inscripciones[4].curso = mockDB.cursos[0];
    
    // Agregar inscripciones a los cursos
    mockDB.cursos.forEach(curso => {
        curso.inscripciones = mockDB.inscripciones.filter(i => i.curso?.id === curso.id);
    });
    
    // Agregar inscripciones a los estudiantes
    mockDB.estudiantes.forEach(estudiante => {
        estudiante.inscripciones = mockDB.inscripciones.filter(i => i.estudiante?.id === estudiante.id);
    });
}

// Helper para simular delay de red
function simulateNetworkDelay() {
    return new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 300));
}

// Helper para clonar objetos evitando referencias circulares
function deepClone(obj, hash = new WeakMap()) {
    // Casos base
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) {
        const arrCopy = [];
        obj.forEach((item, index) => {
            arrCopy[index] = deepClone(item, hash);
        });
        return arrCopy;
    }
    
    // Si ya clonamos este objeto, retornar la copia
    if (hash.has(obj)) return hash.get(obj);
    
    // Clonar objeto
    const objCopy = {};
    hash.set(obj, objCopy);
    
    Object.keys(obj).forEach(key => {
        objCopy[key] = deepClone(obj[key], hash);
    });
    
    return objCopy;
}

// Helper para obtener datos sin referencias circulares (para API)
function getCleanData(entity) {
    if (Array.isArray(entity)) {
        return entity.map(item => getCleanData(item));
    }
    
    if (entity === null || typeof entity !== 'object') {
        return entity;
    }
    
    const cleaned = {};
    
    for (const key in entity) {
        if (key === 'inscripciones' && Array.isArray(entity[key])) {
            // Para inscripciones, solo incluir referencias básicas
            cleaned[key] = entity[key].map(insc => ({
                id: insc.id,
                fecha_inscripcion: insc.fecha_inscripcion,
                nota: insc.nota,
                estado: insc.estado
            }));
        } else if (key === 'estudiante' || key === 'curso') {
            // Para estudiante y curso en inscripciones, incluir solo datos básicos
            if (entity[key]) {
                if (key === 'estudiante') {
                    cleaned[key] = {
                        id: entity[key].id,
                        ano_ingreso: entity[key].ano_ingreso,
                        usuario: entity[key].usuario ? {
                            id: entity[key].usuario.id,
                            nombre_completo: entity[key].usuario.nombre_completo,
                            email: entity[key].usuario.email,
                            rol: entity[key].usuario.rol
                        } : null
                    };
                } else if (key === 'curso') {
                    cleaned[key] = {
                        id: entity[key].id,
                        nombre: entity[key].nombre,
                        descripcion: entity[key].descripcion,
                        duracion_horas: entity[key].duracion_horas
                    };
                }
            } else {
                cleaned[key] = null;
            }
        } else if (key === 'profesor') {
            // Para profesor en cursos
            if (entity[key]) {
                cleaned[key] = {
                    id: entity[key].id,
                    especialidad: entity[key].especialidad,
                    usuario: entity[key].usuario ? {
                        id: entity[key].usuario.id,
                        nombre_completo: entity[key].usuario.nombre_completo,
                        email: entity[key].usuario.email,
                        rol: entity[key].usuario.rol
                    } : null
                };
            } else {
                cleaned[key] = null;
            }
        } else if (key === 'usuario' && typeof entity[key] === 'object' && entity[key] !== null) {
            // Para usuario, solo copiar propiedades básicas
            cleaned[key] = {
                id: entity[key].id,
                nombre_completo: entity[key].nombre_completo,
                email: entity[key].email,
                rol: entity[key].rol
            };
        } else if (typeof entity[key] !== 'object' || entity[key] === null) {
            // Copiar valores primitivos
            cleaned[key] = entity[key];
        }
    }
    
    return cleaned;
}

// Inicializar la base de datos
initializeMockDB();

// Exportar para uso en api.js
window.mockDB = mockDB;
window.simulateNetworkDelay = simulateNetworkDelay;
window.deepClone = deepClone;
window.getCleanData = getCleanData;
window.nextUserId = () => nextUserId++;
window.nextCursoId = () => nextCursoId++;
window.nextInscripcionId = () => nextInscripcionId++;
