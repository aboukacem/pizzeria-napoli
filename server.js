const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Permet de lire le fichier index.html directement à la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Applicatie live op: http://localhost:${PORT}`);
});
