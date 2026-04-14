const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const registrarUsuario = async (nombre, email, password, telefono) => {
  const consulta =
    "INSERT INTO users (nombre, email, password, telefono) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(consulta, [
    nombre,
    email,
    password,
    telefono,
  ]);
  return rows[0];
};

const obtenerUsuario = async (email) => {
  const consulta = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const {
    rows: [user],
  } = await pool.query(consulta, values);
  return user;
};

const registrarOrden = async (user_id, total, carrito) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const queryOrden =
      "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id";
    const resOrden = await client.query(queryOrden, [user_id, total]);
    const orderId = resOrden.rows[0].id;

    for (const producto of carrito) {
      const queryStock = "UPDATE products SET stock = stock - $1 WHERE id = $2";
      await client.query(queryStock, [producto.count, producto.id]);
    }

    await client.query("COMMIT");
    return orderId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const guardarFavorito = async (user_id, product_id) => {
  await pool.query(
    "INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)",
    [user_id, product_id],
  );
  const valores = [user_id, product_id];
  await pool.query(consulta, valores);
};
const obtenerFavoritosPorUsuario = async (user_id) => {
  const consulta = "SELECT * FROM favorites WHERE user_id = $1";
  const { rows } = await pool.query(consulta, [user_id]);
  return rows;
};
const actualizarProducto = async (id, nombre, descripcion, precio, imagen) => {
  const consulta =
    "UPDATE products SET nombre = $1, precio = $2, descripcion = $3, categoria = $4 imagen = $5 WHERE id = $6 RETURNING *";
  const valores = [nombre, precio, descripcion, categoria, imagen, id];
  const { rows } = await pool.query(consulta, valores);
  return rows[0];
};

const obtenerCatalogo = async () => {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
};

module.exports = {
  registrarUsuario,
  obtenerUsuario,
  registrarOrden,
  guardarFavorito,
  obtenerCatalogo,
  actualizarProducto,
  obtenerFavoritosPorUsuario,
  pool,
};
