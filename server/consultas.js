const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false }
});

const registrarUsuario = async (nombre, email, password, telefono) => {
  const consulta = "INSERT INTO users (nombre, email, password, telefono) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(consulta, [nombre, email, password, telefono]);
  return rows[0];
};

const obtenerUsuario = async (email) => {
    const consulta = "SELECT * FROM users WHERE email = $1"; 
    const values = [email];
    const { rows: [user] } = await pool.query(consulta, values);
    return user;
};

const registrarOrden = async (users_id, total) => {
  const consulta = "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id";
  const { rows } = await pool.query(consulta, [users_id, total]);
  return rows[0].id;
};

const guardarFavorito = async (user_id, product_id) => {
  await pool.query("INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)", [user_id, product_id]);
};

const obtenerCatalogo = async () => {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
};

module.exports = { registrarUsuario, obtenerUsuario, registrarOrden, guardarFavorito, obtenerCatalogo, pool };