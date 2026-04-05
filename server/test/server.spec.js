const request = require("supertest");
const app = require("../index"); 

describe("Pruebas de API REST - EnredaArte", () => {
  
  it("Debería retornar un código 200 al solicitar los productos", async () => {
    const response = await request(app).get("/products").send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("Devuelve un código 201 al registrar un nuevo usuario", async () => {
    const emailAleatorio = `test-${Math.random()}@enredarte.cl`;
    const nuevoUsuario = {
      nombre: "Test User",
      email: emailAleatorio,
      password: "password123",
      telefono: "987654321"
    };
    const response = await request(app).post("/users").send(nuevoUsuario);
    expect(response.statusCode).toBe(201);
  });

  it("Debería retornar código 401 si las credenciales son incorrectas", async () => {
    const loginErroneo = { email: "error@mail.com", password: "wrongpassword" };
    const response = await request(app).post("/login").send(loginErroneo);
    expect(response.statusCode).toBe(401);
  });

  it("Retorna código 401 al intentar crear una orden sin token", async () => {
    const nuevaOrden = { user_id: 1, total: 5000 };
    const response = await request(app).post("/orders").send(nuevaOrden);
    expect(response.statusCode).toBe(401); 
  });

});