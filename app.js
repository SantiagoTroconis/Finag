const express = require('express');
const path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
})
app.get('/favorites', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "favorites.html"));
})
app.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "start.html"));
})
app.get('/Manual', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "ManualDeUsuario.pdf"));
})



app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor corriendo en http://localhost:3000");
});