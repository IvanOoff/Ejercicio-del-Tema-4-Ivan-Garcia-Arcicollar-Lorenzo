/*
    - Ejercicio T4 - PW2S.
    - Iván García-Arcicollar Lorenzo.
    - INSV / 3C.
    - 13/02/2026
*/

import { z } from 'zod';

// POST -> A todos.
export const createTodoSchema = z.object({
  body: z.object({
    title: z.string()
      .min(3, 'El título debe tener al menos 3 caracteres')
      .max(100, 'El título no puede exceder 100 caracteres'),
    description: z.string()
      .max(500, 'La descripción no puede exceder 500 caracteres')
      .optional(),
    priority: z.enum(['low', 'medium', 'high'])
      .default('medium'),
  })
});

// PUT-> Actualizar tarea.
export const updateTodoSchema = z.object({
  body: z.object({
    title: z.string()
      .min(3, 'El título debe tener al menos 3 caracteres')
      .max(100, 'El título no puede exceder 100 caracteres')
      .optional(),
    description: z.string()
      .max(500, 'La descripción no puede exceder 500 caracteres')
      .optional(),
    completed: z.boolean().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID debe ser numérico')
  })
}); 

// GET.
export const filterTodoSchema = z.object({
  query: z.object({
    completed: z.enum(['true', 'false'])
      .transform(val => val === 'true')
      .optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    search: z.string().optional(),
    sort: z.enum(['priority', 'date']).optional(),
  })
});

// VALIDAR ID PARAMS.
export const validateIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID debe ser numérico')
  })
});