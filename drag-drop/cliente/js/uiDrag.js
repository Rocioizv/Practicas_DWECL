export const uiDrag = {
    init: (contenedorSelector, cartaSelector) => {
        document.querySelectorAll(contenedorSelector).forEach((contenedor) => {
            contenedor.addEventListener("dragover", (event) => {
                event.preventDefault();
            });

            contenedor.addEventListener("drop", async (event) => {
                event.preventDefault();

                // Obtener datos de la carta arrastrada
                const data = JSON.parse(event.dataTransfer.getData("text"));
                const draggedElement = document.getElementById(data.id);

                // Verificar si el palo de la carta coincide con el contenedor
                const paloContenedor = event.target.dataset.palo;
                const paloCarta = draggedElement.dataset.palo;

                if (paloContenedor === paloCarta) {
                    // Mover la carta al contenedor
                    event.target.appendChild(draggedElement);
                    draggedElement.style.position = "relative";

                    // Guardar el estado actual después del movimiento
                    await guardarEstado();
                } else {
                    alert(`Solo se aceptan cartas de ${paloContenedor}`);
                }
            });

            contenedor.addEventListener("dragenter", (event) => {
                event.target.classList.add("highlight");
            });

            contenedor.addEventListener("dragleave", (event) => {
                event.target.classList.remove("highlight");
            });
        });

        document.querySelectorAll(cartaSelector).forEach((carta) => {
            carta.setAttribute("draggable", "true");
            carta.addEventListener("dragstart", (event) => {
                const sendData = { id: event.target.id };
                event.dataTransfer.setData("text", JSON.stringify(sendData));
            });
        });
    },
};

export function generarBaraja() {
    const palos = ["Oros", "Copas", "Espadas", "Bastos"];
    const cartas = [];

    // Generar las cartas
    for (const palo of palos) {
        for (let numero = 1; numero <= 12; numero++) {
            cartas.push({ numero, palo });
        }
    }

    // Crear elementos HTML para las cartas
    const contenedorCartas = document.getElementById("contenedor-cartas");
    contenedorCartas.innerHTML = ""; // Limpiar antes de generar nuevas cartas

    cartas.forEach((carta, index) => {
        const cartaElement = document.createElement("div");
        cartaElement.className = "carta";
        cartaElement.id = `carta-${index}`;
        cartaElement.dataset.palo = carta.palo;
        cartaElement.textContent = `${carta.numero} ${carta.palo}`;
        contenedorCartas.appendChild(cartaElement);
    });
}

export async function guardarEstado() {
    const estado = Array.from(document.querySelectorAll(".carta")).map((carta) => {
        return {
            id: carta.id,
            palo: carta.dataset.palo,
            numero: carta.textContent,
            contenedorId: carta.parentElement.id, // ID del contenedor actual
        };
    });

    try {
        const response = await fetch("http://localhost:3000/estado", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ estado }),
        });

        if (!response.ok) {
            throw new Error("Error al guardar el estado");
        }

        console.log("Estado guardado correctamente");
    } catch (error) {
        console.error("Error al guardar el estado:", error);
    }
}

export async function recuperarEstado() {
    try {
        const response = await fetch("http://localhost:3000/estado");

        if (!response.ok) {
            throw new Error("Error al recuperar el estado");
        }

        const data = await response.json();
        reconstruirEstado(data.estado);
    } catch (error) {
        console.error("Error al recuperar el estado:", error);
    }
}

function reconstruirEstado(estado) {
    // Limpiar contenedores actuales
    document.querySelectorAll(".contenedor").forEach((contenedor) => {
        contenedor.innerHTML = "";
    });

    const contenedorCartas = document.getElementById("contenedor-cartas");
    contenedorCartas.innerHTML = ""; // Vaciar las cartas

    // Reconstruir las cartas en sus contenedores
    estado.forEach((item) => {
        const cartaElement = document.createElement("div");
        cartaElement.className = "carta";
        cartaElement.id = item.id;
        cartaElement.dataset.palo = item.palo;
        cartaElement.textContent = item.numero;

        const contenedor = document.getElementById(item.contenedorId);
        contenedor.appendChild(cartaElement);
    });

    // Rehabilitar funcionalidad de arrastrar y soltar
    uiDrag.init(".contenedor", ".carta");
}
