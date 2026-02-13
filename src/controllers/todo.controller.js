/*
    - Ejercicio T4 - PW2S.
    - Iván García-Arcicollar Lorenzo.
    - INSV / 3C.
    - 13/02/2026
*/


import { todos } from '../data/data.js';

// GET.
export const getAll = (req, res) => {
  let resultado = [...todos];
  const{ completed, priority, search, sort } = req.filters || {};

  if (completed !== undefined) resultado = resultado.filter(t => t.completed === completed);
  if (priority) resultado = resultado.filter(t => t.priority === priority);
  if (search) {
    const s = search.toLowerCase();
    resultado = resultado.filter(t => t.title.toLowerCase().includes(s) || t.description?.toLowerCase().includes(s));
  }

  if (sort === 'priority') {
    const order = { high: 1, medium: 2, low: 3 };
    resultado.sort((a, b) => order[a.priority] - order[b.priority]);
  } else if (sort === 'date') {
    resultado.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  res.json({ success: true, count: resultado.length, data: resultado });
};

// GET /api/todos/:id - Obtener una
export const getById = (req, res) => {
  const todo = todos.find(t => t.id === req.todoId);
  if (!todo) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json({ success: true, data: todo });
};

// POST /api/todos - Crear
export const create = (req, res) => {
  const newTodo = {
    id: Math.max(...todos.map(t => t.id), 0) + 1,
    ...req.validatedBody,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  res.status(201).json({ success: true, data: newTodo });
};

// PUT /api/todos/:id - Actualizar
export const update = (req, res) => {
  const index = todos.findIndex(t => t.id === req.todoId);
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });
  
  todos[index] = { ...todos[index], ...req.validatedBody };
  res.json({ success: true, data: todos[index] });
};

// DELETE /api/todos/:id - Eliminar
export const remove = (req, res) => {
  const index = todos.findIndex(t => t.id === req.todoId);
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });
  
  const deleted = todos.splice(index, 1);
  res.json({ success: true, message: 'Tarea eliminada', data: { id: deleted[0].id } });
};

// PATCH /api/todos/:id/toggle - Cambiar completada
export const toggle = (req, res) => {
  const index = todos.findIndex(t => t.id === req.todoId);
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });
  
  todos[index].completed = !todos[index].completed;
  res.json({ success: true, data: todos[index] });
};