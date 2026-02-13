/*
    - Ejercicio T4 - PW2S.
    - Iván García-Arcicollar Lorenzo.
    - INSV / 3C.
    - 13/02/2026
*/

import app from '../app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado -> http://localhost:${PORT}`);
  console.log(`API -> http://localhost:${PORT}/api/todos`);
  console.log(`Health check -> http://localhost:${PORT}/health`);
});