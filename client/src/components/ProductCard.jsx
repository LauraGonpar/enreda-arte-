import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const { addToCart, imagenesMapa, toggleFavorite, user } = useContext(ProductContext);
  const navigate = useNavigate();

  if (!product) return null;

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    toggleFavorite(product);
  };

  const handleAdd = (e) => {
    e.stopPropagation(); 
    addToCart(product);
    Swal.fire({
      title: "¡Agregado!",
      text: `${product.nombre} ya está en tu carrito.`,
      icon: "success",
      confirmButtonColor: "#b38e6d", 
    });
  };

  return (
    <div className="card h-100 shadow-sm border-0 product-card-hover position-relative bg-white">
      
      {user && (
        <button
      className="btn btn-sm position-absolute top-0 end-0 m-3 px-3 py-1 fw-bold border border-dark bg-light text-dark shadow-sm" onClick={handleFavoriteClick} style={{ zIndex: 10, borderRadius: '50px', fontSize: '0.8rem', width: '40px', height: '40px',display:'flex',  alignItems: 'center', justifyContent: 'center' }}
        > ♥️
</button>
      )}

      <div onClick={() => navigate(`/producto/${product.id}`)} style={{ cursor: 'pointer' }}>
        <img 
          src={imagenesMapa[product.id]} 
          className="card-img-top w-100" 
          alt={product.nombre} 
          style={{ height: "280px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
        />
        
        <div className="card-body d-flex flex-column">
          <h6 className="fw-bold text-enredarte-red mb-1" style={{ fontSize: '1.1rem' }}>
            {product.nombre || "Producto EnredaArte"}
          </h6>
          
          <p className="text-muted small flex-grow-1 mb-2" style={{ fontSize: '0.8rem' }}>
            {product.descripcion}
          </p>
          
          <p className="fw-bold text-enredarte-red mb-3">
            {product.rango_precio || `$${product.precio?.toLocaleString('es-CL')}`}
          </p>
        </div>
      </div>

      <div className="card-footer bg-white border-0 pt-0 pb-3 px-3">
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-enredarte btn-sm flex-grow-1 fw-bold" 
            onClick={() => navigate(`/producto/${product.id}`)}
          >
            Detalles
          </button>
          <button 
            className="btn btn-brown btn-sm flex-grow-1 fw-bold text-white" 
            onClick={handleAdd}
          >
            Añadir 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;