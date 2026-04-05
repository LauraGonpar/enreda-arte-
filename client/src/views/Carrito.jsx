import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, token,  imagenesMapa } = useContext(ProductContext);
  const navigate = useNavigate();

  const totalSeguro = Number(cartTotal) || 0;

  const handleFinalizarCompra = async () => {
    if (cart.length === 0) {
      Swal.fire("Carrito vacío", "Agrega algunas joyas de EnredaArte antes de comprar", "warning");
      return;
    }

    if (!token) {
      Swal.fire("Inicia Sesión", "Debes estar logueado para finalizar tu compra", "info");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          productos: cart,
          total: totalSeguro,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "¡Completa los datos!",
          text: "Agrega los datos de tu tarjeta para finalizar la compra",
          
          confirmButtonColor: "#b38e6d",
        });
       
        navigate("/checkout"); 
      } else {
        Swal.fire("Error", "No pudimos procesar tu pedido", "error");
      }
    } catch (error) {
      console.error("Error en la compra:", error);
      Swal.fire("Error", "El servidor de EnredaArte no responde", "error");
    }
  };

  return (
    <div className="container mt-5 pt-5 min-vh-100">
      <h2 className="mb-4 fw-bold text-dark">Tu Carrito de Compras 🧶</h2>
      
      <div className="row">
        <div className="col-lg-8">
          {cart.length === 0 ? (
            <div className="alert alert-light border shadow-sm p-5 text-center">
              <h4>Tu carrito está vacío</h4>
              <p>¡Nuestras joyas artesanales te están esperando!</p>
              <button className="btn btn-brown text-white mt-3" onClick={() => navigate("/tienda")}>
                Ir a la Tienda
              </button>
            </div>
          ) : (
            <div className="card shadow-sm border-0">
              <ul className="list-group list-group-flush">
                {cart.map((item) => (
                  <li key={item.id} className="list-group-item py-3">
                    <div className="row align-items-center">
                      <div className="col-2">
                        <img 
                          src={item.imagen || imagenesMapa[item.id] || "https://img.freepik.com/vector-premium/joyeria-logotipo-alambrismo-cristales_605054-12.jpg"} 
                          alt={item.nombre} 
                          className="img-fluid rounded shadow-sm" 
                          style={{ height: "80px", objectFit: "cover", width: "100%" }}
                        />
                      </div>
                      <div className="col-4">
                        <h6 className="mb-0 fw-bold">{item.nombre}</h6>
                        <small className="text-muted">{item.color || "Pieza única"}</small>
                      </div>
                      <div className="col-3 d-flex align-items-center">
                        <button 
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => updateQuantity(item.id, Math.max(1, (Number(item.count) || 1) - 1))}
                        > - </button>
                        
                        <span className="mx-3 fw-bold">{item.count || 1}</span>
                        
                        <button 
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => updateQuantity(item.id, (Number(item.count) || 1) + 1)}
                        > + </button>
                      </div>
                      <div className="col-2 text-end">
                        <span className="fw-bold">
                          ${(Number(item.precio || 0) * (Number(item.count) || 1)).toLocaleString("es-CL")}
                        </span>
                      </div>
                      <div className="col-1 text-center">
                        <button 
                          className="btn btn-link text-danger p-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="bi bi-trash fs-5"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0 bg-light p-3">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-4 text-center">Resumen de Compra</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${totalSeguro.toLocaleString("es-CL")}</span>
              </div>
              <div className="d-flex justify-content-between mb-4 border-top pt-2">
                <span className="fw-bold fs-5">Total</span>
                <span className="fw-bold fs-5 text-enredarte-red">
                  ${totalSeguro.toLocaleString("es-CL")}
                </span>
              </div>
              <button 
                className="btn btn-brown w-100 py-2 fw-bold text-white shadow-sm"
                onClick={handleFinalizarCompra}
              >
                FINALIZAR COMPRA
              </button>
              <p className="text-center small text-muted mt-3">
                Pagos seguros vía EnredaArte Store
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;