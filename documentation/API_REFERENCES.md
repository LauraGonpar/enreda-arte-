# 📄 Contrato de Datos API REST - EnredaArte



## POST /users

request:
  payload: {
    nombre: String,
    email: String,
    password: String,
    telefono: String
  }

## POST /login

request:
  payload: {
    email: String,
    password: String
  }

response: {
  token: String,
  user: {
    id: Number,
    nombre: String,
    email: String,
    role: String
  }
}

## GET /products
response: [
  {
    id: Number,
    nombre: String,
    descripcion: String,
    precio: Number,
    color: String,
    stock: Number
  }
]

## POST /orders
request:
  payload: {
    user_id: Number,
    total: Number,
    fecha: String, 
    productos: [{
      id: Number,
      cantidad: Number,
      precio: Number
    }]
  }

## POST /favorites

request:
  payload: {
    user_id: Number,
    product_id: Number
  }
## POST /products
  request:
  payload: {
    nombre: String,
    descripcion: String,
    precio: Number,
    color: String,
    stock: Number,
    imagen_url: String
  }

response: {
  status: "success",
  message: "Producto agregado correctamente",
  product_id: Number
}