import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Favoritos = () => {
  const { favorites = [] } = useContext(ProductContext);

  return (
    <div className="container-fluid bg-enredarte-cream pt-5 mt-5 min-vh-100 px-lg-5">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="text-enredarte-red fw-bold display-5">Mis Joyas Favoritas ⭐</h2>
          <p className="text-muted">Las piezas de EnredaArte que más te han enamorado.</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-5 border-0 rounded bg-white shadow-sm">
            <h4 className="text-muted mb-3">Tu lista de deseos está vacía</h4>
            <p className="mb-4">¿Aún no encuentras tu joya ideal?</p>
            <Link to="/tienda" className="btn btn-brown text-white px-4 fw-bold">
              Explorar Tienda
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {favorites.map((product) => (
              <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoritos;