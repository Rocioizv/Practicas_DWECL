import { uiDrag, generarBaraja } from './uiDrag.js';

document.addEventListener("DOMContentLoaded", () => {
    // Generar las cartas
    generarBaraja();

    // Inicializar la funcionalidad de arrastrar y soltar
    uiDrag.init(".contenedor", ".carta");
});
