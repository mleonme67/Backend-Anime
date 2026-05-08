const supabase = require('../config/db');

async function getAnimes(req, res, url) {
    let category = (url.searchParams.get('category') || '').trim().toLowerCase();
    const nombre = (url.searchParams.get('nombre') || '').trim();
    
    if (category.includes('hunter')) category = 'hunter x hunter';

    try {
        let query = supabase
            .from('characters')
            .select('nombre, edad, poder_tecnica, imagenes, category');

        if (category) {
            // Buscamos coincidencia exacta o parecida en categoría
            query = query.or(`category.eq."${category}",category.ilike."%${category}%"`);
        }

        if (nombre) {
            // Búsqueda por nombre (insensible a mayúsculas)
            query = query.ilike('nombre', `%${nombre}%`);
        }

        const { data, error } = await query.limit(10);

        if (error) throw error;

        // Supabase ya devuelve los campos JSON como objetos, así que no hace falta JSON.parse
        // Sin embargo, nos aseguramos de que imagenes sea un arreglo si viene vacío o nulo
        const processedData = data.map(char => ({
            ...char,
            imagenes: char.imagenes || []
        }));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(processedData));
    } catch (error) {
        console.error('Error en Supabase:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
}

module.exports = { getAnimes };
