/*
    - Ejercicio T4 - PW2S.
    - Iván García-Arcicollar Lorenzo.
    - INSV / 3C.
    - 13/02/2026
*/

// FUNCIONES ENTRE REQUEST Y RESPONSE.
import { ZodError } from 'zod';
import { createTodoSchema, updateTodoSchema, filterTodoSchema, validateIdSchema } from '../schemas/schemas.js';

// POST -> CREACION DE LA TAREA - TODO.
export const validateCreateTodo = (req, res, next) => {
  try {
    const v = createTodoSchema.parse({body: req.body });
    req.validatedBody = v.body;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'ERROR DE VALIDACION',
        detalles: error.errors.map(e => ({ campo: e.path.join('.'), mensaje: e.message }))
      });
    }
    next(error);
  }
};

// PUT -> VALIDACIÓN DE LA TAREA.
export const validateUpdateTodo= (req, res, next) => {
  try {
    const v = updateTodoSchema.parse({ body: req.body,params: req.params});
    req.validatedBody = v.body;
    req.todoId = parseInt(v.params.id);
    next();

  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'ERROR DE VALIDACION',
        detalles: error.errors.map(e => ({ campo: e.path.join('.'), mensaje: e.message }))
      });
    }
    next(error);
  }
};

// GET -> VALIDACIÓN DE FILTROS.
export const validateFilters = (req, res, next) => {
  try {
    const v = filterTodoSchema.parse({ query: req.query });
    req.filters = v.query;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'FILTROS INVALIDOS',
        detalles: error.errors.map(e => ({ campo: e.path.join('.'), mensaje: e.message }))
      });
    }
    next(error);
  }
};

// VALIDACION DEL ID.
export const validateIdParam = (req, res, next) => {
  try {
    const v = validateIdSchema.parse({ params: req.params });
    req.todoId = parseInt(v.params.id);
    next();

  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'ID inválido',
        detalles: error.errors.map(e => ({ campo: e.path.join('.'), mensaje: e.message }))
      });
    }
    next(error);
  }
};

// MANEJO DE ERRORES GLOBAL.
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message ||'ERR' });
};


// MANEJO DE ERRORES DE RUTA.
export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'RUTA -> NO ENCONTRADA' });
};