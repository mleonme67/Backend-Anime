const fs = require('fs');
const path = require('path');

function serveStaticFile(req, res, url) {
    // path.join with the root backend directory (two levels up from src/utils)
    const basePath = path.join(__dirname, '..', '..'); 
    const filePath = path.join(basePath, url.pathname);
    
    if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif' };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
        return true;
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Archivo no encontrado' }));
        return true;
    }
}

module.exports = { serveStaticFile };
