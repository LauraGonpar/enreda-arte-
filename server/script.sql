CREATE DATABASE enredaarte;
\c enredaarte

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  rol VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio INTEGER NOT NULL,
  color VARCHAR(50),
  stock INTEGER NOT NULL,
  imagen TEXT,
  categoria TEXT
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  total INTEGER NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (nombre, email, password, telefono, rol) 
VALUES ('Laura Gonzalez', 'admin@enredaarte.cl', 'admin123', '+56912345678', 'admin');