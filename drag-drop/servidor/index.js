const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());n
app.use(express.json()); 

// Estado en memoria 
let estado = [];

// Endpoint para obtener el estado actual de las cartas
app.get('/estado', (req, res) => {
    res.json({ estado });
});

// Endpoint para guardar el estado de las cartas
app.post('/estado', (req, res) => {
    const { estado: nuevoEstado } = req.body;
    estado = nuevoEstado; // Actualizamos el estado con el nuevo estado
    res.status(200).send('Estado guardado correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
