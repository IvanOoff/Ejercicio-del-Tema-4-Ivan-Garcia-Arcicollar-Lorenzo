/*
    - Ejercicio T4 - PW2S.
    - Iván García-Arcicollar Lorenzo.
    - INSV / 3C.
    - 13/02/2026
*/

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import todoRoutes from './src/routes/todo.routes.js';
import { errorHandler, notFoundHandler } from './src/middleware/middleware.js';

const app = express();

// Seguridad
app.use(helmet());
app.use(cors());

// Parseo de body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rutas de la API
app.use('/api', todoRoutes);

// Manejo de errores (SIEMPRE AL FINAL)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;