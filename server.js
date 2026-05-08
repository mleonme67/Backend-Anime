require('dotenv').config();
const http = require('http');

// Importar módulos organizados
const { getAnimes } = require('./src/controllers/animeController');
const { serveStaticFile } = require('./src/utils/fileServer');

const server = http.createServer(async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    
    // 1. Manejo de archivos estáticos (Imágenes)
    if (url.pathname.startsWith('/assets/')) {
        serveStaticFile(req, res, url);
        return;
    }

    // 2. Manejo de rutas de la API
    if (url.pathname === '/api/animes' && req.method === 'GET') {
        await getAnimes(req, res, url);
        return;
    } 

    // 3. Manejo de rutas no encontradas (404)
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
