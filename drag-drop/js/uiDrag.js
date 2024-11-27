export const uiDrag = {
    init: (selector1, selector2) => {
        document.querySelectorAll(selector1).forEach((item) => {
            item.addEventListener("drop", (event) => {
                event.preventDefault();

                // Obtener datos de la carta arrastrada
                const data = JSON.parse(event.dataTransfer.getData("text"));
                const draggedElement = document.getElementById(data.id);

                // Verificar si el palo de la carta coincide con el contenedor
                const paloContenedor = event.target.dataset.palo;
                const paloCarta = draggedElement.dataset.palo;

                if (paloContenedor === paloCarta) {
                    // Si coincide, agregar la carta al contenedor
                    event.target.appendChild(draggedElement);
                    draggedElement.style.position = "relative";
                    draggedElement.style.left = "unset";
                    draggedElement.style.top = "unset";
                } else {
                    alert(`Solo acepta cartas de ${paloContenedor}`);
                }
            });

            item.addEventListener("dragover", (event) => {
                event.preventDefault();
            });
        });

        // Configurar las cartas arrastrables
        document.querySelectorAll(selector2).forEach((item) => {
            item.setAttribute("draggable", "true");
            item.addEventListener("dragstart", (event) => {
                const sendData = { id: event.target.id };
                event.dataTransfer.setData("text", JSON.stringify(sendData));
            });
        });
    },
};

export function generarBaraja() {
    const palos = ["Oros", "Copas", "Espadas", "Bastos"];
    const cartas = [];

    // Generar todas las cartas de la baraja española
    for (const palo of palos) {
        for (let numero = 1; numero <= 12; numero++) {
            cartas.push({ numero, palo });
        }
    }

    // Crear elementos para cada carta
    const contenedorCartas = document.getElementById("contenedor-cartas");
    cartas.forEach((carta, index) => {
        const cartaElement = document.createElement("div");
        cartaElement.className = "carta";
        cartaElement.id = `carta-${index}`;
        cartaElement.dataset.palo = carta.palo;
        cartaElement.textContent = `${carta.numero} ${carta.palo}`;
        contenedorCartas.appendChild(cartaElement);
    });
}
