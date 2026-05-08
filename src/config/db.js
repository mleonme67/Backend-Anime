const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// --- CONEXIÓN ANTERIOR (MariaDB/MySQL) ---
/*
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'anime_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool;
*/

// --- NUEVA CONEXIÓN (Supabase) ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Advertencia: SUPABASE_URL o SUPABASE_KEY no están configurados en el archivo .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

