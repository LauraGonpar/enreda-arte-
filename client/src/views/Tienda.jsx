import { useContext, useState, useEffect } from "react"; 
import { ProductContext } from "../context/ProductContext";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Tienda = () => {
  const { products, imagenesMapa, addToCart, toggleFavorite, user } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const categoriaSeleccionada = queryParams.get("categoria");

  useEffect(() => {
    if (categoriaSeleccionada) {
      const filtrados = products.filter(
        (p) => p.categoria?.toLowerCase() === categoriaSeleccionada.toLowerCase()
      );
      setProductosFiltrados(filtrados);
    } else {
      setProductosFiltrados(products);
    }
  }, [categoriaSeleccionada, products]);

  const manejarFiltroClick = (cat) => {
    if (cat === "Todas") {
      navigate("/Tienda");
    } else {
      navigate(`/Tienda?categoria=${cat.toLowerCase()}`);
    }
  };

  return (
    <div className="container-fluid bg-enredarte-cream pt-5 mt-5 min-vh-100 px-5">
      <div className="row">
        <div className="col-md-2 pe-4">
          <h2 className="text-enredarte-red fw-bold mb-4">Tienda</h2>
          <p className="small text-muted mb-4">
            Explora nuestra colección de joyería artesanal hecha a mano.
          </p>
          <h5 className="fw-bold text-enredarte-red mb-3">Filtros</h5>
          <div className="filter-section">
            <p className="fw-bold small mb-2">Categorías</p>
            {["Todas", "Aros", "Pulseras", "Collares"].map((cat) => (
              <div key={cat} className="form-check mb-2">
                <input
                  className="form-check-input shadow-sm border-dark"
                  type="radio" 
                  name="categoriaFiltro"
                  id={cat}
                  checked={categoriaSeleccionada === cat.toLowerCase() || (cat === "Todas" && !categoriaSeleccionada)}
                  onChange={() => manejarFiltroClick(cat)}
                />
                <label className="form-check-label small" htmlFor={cat} style={{ cursor: 'pointer' }}>
                  {cat}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="small text-muted">
              Mostrando {productosFiltrados.length} Diseños de EnredaArte
            </span>
            {categoriaSeleccionada && (
              <button 
                className="btn btn-link text-enredarte-red btn-sm text-decoration-none"
                onClick={() => navigate("/Tienda")}
              >
                Limpiar filtros x
              </button>
            )}
          </div>

          <div className="row g-4">
            {productosFiltrados.map((p) => (
              <div key={p.id} className="col-md-4">
                <div className="card border-0 bg-transparent h-100 product-card-tienda position-relative">
                  <div className="image-container-wrapper position-relative">
                    {user && (
                      <button
                        className="btn btn-sm position-absolute top-0 end-0 m-3 px-3 py-1 fw-bold border border-dark bg-light text-dark shadow-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(p);
                        }}
                        style={{
                          zIndex: 10,
                          borderRadius: "50px",
                          fontSize: "0.8rem",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ♥️
                      </button>
                    )}

                    <Link to={`/producto/${p.id}`} className="text-decoration-none">
                      <div
                        className="image-container shadow-sm mb-3 bg-white"
                        style={{
                          height: "350px",
                          overflow: "hidden",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={p.imagen || imagenesMapa[p.id] || "https://img.freepik.com/vector-premium/joyeria-logotipo-alambrismo-cristales_605054-12.jpg"}
                          className="card-img-top img-fluid w-100 h-100 object-fit-cover transition-zoom"
                          alt={p.nombre}
                        />
                      </div>
                    </Link>
                  </div>

                  <div className="ps-1">
                    <h6 className="fw-bold text-enredarte-red mb-1" style={{ fontSize: "1.1rem" }}>
                      {p.nombre}
                    </h6>
                    <p className="small text-enredarte-red opacity-75 fw-medium mb-3">
                      ${Number(p.precio || 0).toLocaleString('es-CL')}
                    </p>

                    <div className="d-flex gap-2 mb-4">
                      <button
                        className="btn btn-brown btn-sm flex-grow-1 fw-bold text-white"
                        onClick={() => navigate(`/producto/${p.id}`)}
                      >
                        Detalle
                      </button>
                      <button
                        className="btn btn-brown btn-sm flex-grow-1 fw-bold text-white"
                        onClick={() => addToCart(p)}
                      >
                        Añadir 🛒
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <div className="text-center my-5 p-5 bg-white rounded shadow-sm">
              <h4>No encontramos productos en esta categoría</h4>
              <p>Pronto subiremos nuevos diseños. ¡Sigue explorando!</p>
              <button className="btn btn-brown text-white" onClick={() => navigate("/Tienda")}>
                Ver todo el catálogo
              </button>
            </div>
          )}

          <div className="text-center my-5">
            <button className="btn btn-outline-dark px-5 py-2 fw-bold bg-enredarte-cream">
              Cargar más productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tienda;