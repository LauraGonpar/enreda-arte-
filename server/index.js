const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = require('./secretKey');
const {pool, registrarUsuario, obtenerUsuario, registrarOrden, guardarFavorito, obtenerCatalogo } = require('./consultas');
const { validarToken } = require('./middlewares');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;
    const nuevoUsuario = await registrarUsuario(nombre, email, password, telefono);
    res.status(201).json({ 
      message: "Usuario creado con éxito", 
      user: nuevoUsuario 
    });
  } catch (error) {
    console.error("ERROR REAL AL GUARDAR:", error.message);
    if (error.code === '23505') { 
      return res.status(400).json({ message: "Este correo ya está registrado" });
    }
    res.status(500).json({ message: "Error interno del servidor", detail: error.message });
  }
});
app.get("/users", async (req, res) => {
 try {
    const { rows } = await pool.query("SELECT * FROM users"); 
    res.json(rows);
  } catch (error) {
    console.error("Error en la base de datos:", error.message);
    res.status(500).json({ error: "No se pudo obtener la lista" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await obtenerUsuario(email);
  
  if (user && user.password === password) {
    const token = jwt.sign({ email: user.email, id: user.id }, secretKey);
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
  } else {
    res.status(401).json({ message: "Correo o clave incorrecta" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await obtenerCatalogo();
    const productsFormatted = products.map(p => ({
      ...p,
      precio: Number(p.precio)
    }));
    res.json(productsFormatted);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener catálogo" });
  }
});

app.post("/orders", validarToken, async (req, res) => {
  const { user_id, total } = req.body;
  const orderId = await registrarOrden(user_id, total);
  res.json({ status: "success", order_id: orderId });
});

app.post("/products", async (req, res) => {
  try {
    const { nombre, precio, descripcion, stock, categoria, imagen, color  } = req.body;
    
    const consulta = "INSERT INTO products (nombre, precio, descripcion, stock, categoria, imagen, color) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const valores = [nombre, precio, descripcion, stock, categoria, imagen, color];
    
    const { rows } = await pool.query(consulta, valores);
    res.status(201).json(rows[0]); 
  } catch (error) {
    console.error("Error al guardar joya:", error.message);
    res.status(500).json({ error: "No se pudo guardar el producto" });
  }
});


if (require.main === module) {
  app.listen(3000, () => console.log("🔥 EnredaArte Server en puerto 3000 (neon)"));
}
module.exports = app;