import { uiDrag, generarBaraja, guardarEstado, recuperarEstado } from './uiDrag.js';

document.addEventListener("DOMContentLoaded", async () => {
    // Intentar recuperar el estado desde la API
    await recuperarEstado();

    // Si no se ha recuperado el estado o no hay cartas, genera la baraja inicial
    if (document.querySelectorAll(".carta").length === 0) {
        generarBaraja(); // Solo genera la baraja si no hay cartas
        uiDrag.init(".contenedor", ".carta");
    }
});
