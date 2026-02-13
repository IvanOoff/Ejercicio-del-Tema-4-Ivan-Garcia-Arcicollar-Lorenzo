/*
    - Ejercicio T4 - PW2S.
    - Iván García-Arcicollar Lorenzo.
    - INSV / 3C.
    - 13/02/2026
*/

import express from 'express';
import * as controller from '../controllers/todo.controller.js';
import { validateCreateTodo, validateUpdateTodo, validateFilters, validateIdParam } from '../middleware/middleware.js';

const router = express.Router();

// GET LISTAR TODOS
router.get('/todos', validateFilters, controller.getAll);

// GET PARA OBTENER UNA.
router.get('/todos/:id', validateIdParam, controller.getById);

// POST -> CREACIÓN.
router.post('/todos', validateCreateTodo, controller.create);

// PUT PARA ACTUALIZAR LA ID.
router.put('/todos/:id', validateIdParam, validateUpdateTodo, controller.update);

// DELETE ELIMINAR LA ID.
router.delete('/todos/:id', validateIdParam, controller.remove);

// PATCH CAMBIO COMPLETADO,
router.patch('/todos/:id/toggle', validateIdParam, controller.toggle);
export default router;