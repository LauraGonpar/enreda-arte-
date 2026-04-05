import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import Swal from "sweetalert2";

const DetalleProducto = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { products, addToCart, imagenesMapa } = useContext(ProductContext);
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const detalle = products.find((p) => p.id == id);
    
    if (detalle) {
      setProducto(detalle);
    } else if (products.length > 0) {
      navigate("/Tienda");
    }
  }, [id, products, navigate]);

  const handleAdd = () => {
    addToCart(producto);
    Swal.fire({
      title: "¡Excelente elección!",
      text: `${producto.nombre} se añadió al carrito.`,
      icon: "success",
      confirmButtonColor: "#d9a05b"
    });
  };

  if (!producto) return (
    <div className="text-center mt-5 p-5">
      <div className="spinner-border text-brown" role="status"></div>
      <p className="mt-3">Buscando los detalles de tu joya...</p>
    </div>
  );

  return (
    <div className="container mt-5 pt-5">
      <div className="card mb-5 shadow-lg border-0 overflow-hidden" style={{ borderRadius: "15px" }}>
        <div className="row g-0">
          <div className="col-md-6">
            <img 
              src={producto.imagen || imagenesMapa[producto.id] || "https://img.freepik.com/vector-premium/joyeria-logotipo-alambrismo-cristales_605054-12.jpg"} 
              className="img-fluid h-100 w-100" 
              alt={producto.nombre} 
              style={{ objectFit: "cover", minHeight: "500px" }}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center bg-white">
            <div className="card-body p-lg-5">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <button onClick={() => navigate("/Tienda")} className="btn btn-link p-0 text-decoration-none text-muted small">Colección</button>
                  </li>
                  <li className="breadcrumb-item active small">{producto.nombre}</li>
                </ol>
              </nav>
              
              <h1 className="display-6 fw-bold text-dark">{producto.nombre}</h1>
              <span className="badge bg-light text-dark border mb-3">{producto.categoria || "Artesanía"}</span>
              <hr />
              
              <p className="card-text fs-5 text-secondary mb-4">
                {producto.descripcion || "Esta pieza única de alambrismo ha sido creada con dedicación y cristales seleccionados."}
              </p>
              
              <div className="bg-light p-4 rounded-3 mb-4">
                <h2 className="text-dark fw-bold mb-0">
                  ${Number(producto.precio).toLocaleString("es-CL")}
                </h2>
                <div className="mt-3">
                  <p className="mb-1"><strong>Color / Piedra:</strong> {producto.color || "Personalizado"}</p>
                  <p className="mb-0">
                    <strong>Disponibilidad:</strong> {producto.stock > 0 ? `${producto.stock} unidades` : "A pedido"}
                  </p>
                </div>
              </div>

              <div className="d-grid gap-3">
                <button 
                  className="btn btn-dark btn-lg fw-bold text-white shadow-sm"
                  onClick={handleAdd}
                  disabled={producto.stock <= 0}
                >
                  {producto.stock > 0 ? "Añadir al Carrito 🛒" : "Agotado temporalmente"}
                </button>
                <button className="btn btn-outline-secondary" onClick={() => navigate("/Tienda")}>
                  ← Seguir Vitrineando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;