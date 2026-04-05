import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Swal from "sweetalert2";

const Login = () => {

  const { login } = useContext(ProductContext); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
     
const data = await response.json();
      if (response.ok) {
        login(data.token, data.user); 

        Swal.fire({
          title: `¡Bienvenid@ ${data.user.nombre}!`,
          text: "Has ingresado correctamente",
          icon: "success",
          confirmButtonColor: "#b38e6d"
        });

        if (data.user.rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }

      } else {
        Swal.fire("Error", data.message || "Credenciales incorrectas", "error");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0 shadow-lg overflow-hidden rounded-4 mt-5">
      <div className="col-md-5 bg-enredarte-red d-flex flex-column justify-content-center align-items-center text-white p-5">
        <h1 className="display-5 fw-bold mb-4">EnredaArte</h1>
        <p className="text-center opacity-75 mb-5">Tu portal a la joyería artesanal.</p>
      </div>

      <div className="col-md-7 bg-enredarte-cream d-flex flex-column justify-content-center p-5">
        <h2 className="fw-bold mb-4">Bienvenido de vuelta</h2>

        <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
          <div className="mb-3">
            <label className="form-label small fw-bold">E-mail</label>
            <input 
              type="email" 
              className="form-control border-0 py-2 shadow-sm"
              placeholder="tu@email.com"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-bold">Contraseña</label>
            <input 
              type="password" 
              className="form-control border-0 py-2 shadow-sm" 
              placeholder="Ingresa tu clave"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="btn btn-brown w-100 py-2 fw-bold mb-3 shadow">
            Confirmar
          </button>
          <p className="text-center small">
            ¿No tienes cuenta aún? <Link to="/registro" className="fw-bold text-dark">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;