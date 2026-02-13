/*
    - Ejercicio T4 - PW2S.
    - Iván García-Arcicollar Lorenzo.
    - INSV / 3C.
    - 13/02/2026
*/

export const todos = [
  {
    id: 1,
    title: 'Aprender Express',
    description: 'Entender routing, middleware y manejo de errores en Express.js',
    completed: true,
    priority: 'high',
    createdAt: new Date('2024-01-15T09:30:00').toISOString(),
  },
    {
    id: 2,
    title: 'Crear API REST completa',
    description: 'Implementar todos los CRUD endpoints',
    completed: false,
    priority: 'medium',
    createdAt: new Date('2024-01-17T10:15:00').toISOString(),
  },

  {
    id: 3,
    title: 'Validar datos con Zod',
    description: 'Implementar esquemas de validación para requests',
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-16T14:20:00').toISOString(),
  },

  {
    id: 4,
    title: 'Probar endpoints con HTTP',
    description: 'Verificar que todos funcionen correctamente',
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-18T11:45:00').toISOString(),
  },
  {
    id: 5,
    title: 'Documentar el código',
    description: null,
    completed: false,
    priority: 'low',
    createdAt: new Date('2024-01-19T16:00:00').toISOString(),
  },
];