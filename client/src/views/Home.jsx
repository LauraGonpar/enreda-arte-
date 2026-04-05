import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

import Aros from "../assets/img/aros model.png";
import Pulseras from "../assets/img/pulsera-model.png";

const Home = () => {
  const { products, imagenesMapa } = useContext(ProductContext);
  const navigate = useNavigate();

  const ultimosDisenos = [...products].reverse().slice(0, 3);
  const manejarNavegacionCategoria = (categoria) => {
    navigate(`/Tienda?categoria=${categoria.toLowerCase()}`);
  };
  return (
    <div className="home-container">
      <section className="hero-section position-relative text-center d-flex align-items-center justify-content-center text-white">
        <div className="hero-overlay"></div>
        <div className="hero-content position-relative z-1">
          <h1 className="display-3 fst-italic">
            Joyería artesanal con alma de cobre y cristales
          </h1>
        </div>
      </section>

      <section className="container py-5 text-center">
        <h2 className="title-section mb-2">Categorías</h2>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "600px" }}>
          Explora nuestras piezas únicas divididas por tipo de accesorio para
          encontrar el complemento ideal.
        </p>
        <button
          className="btn btn-outline-dark mb-5 px-4 rounded-0"
          onClick={() => navigate("/Tienda")}
        >
          Ver Catálogo
        </button>
        <div className="row justify-content-center g-4">
          <div
            className="col-6 col-md-4"
            onClick={() => manejarNavegacionCategoria("Aros")}
            style={{ cursor: "pointer" }}
          >
            <div className="category-card shadow-sm border-0 card">
              <img src={Aros} className="card-img-top" alt="Aros" />
              <div className="card-footer bg-white border-0 py-3 text-center">
                <h5 className="mb-0 text-enredarte-red fw-bold">Aros</h5>
              </div>
            </div>
          </div>

          <div
            className="col-6 col-md-4"
            onClick={() => manejarNavegacionCategoria("Pulseras")}
            style={{ cursor: "pointer" }}
          >
            <div className="category-card shadow-sm border-0 card">
              <img src={Pulseras} className="card-img-top" alt="Pulseras" />
              <div className="card-footer bg-white border-0 py-3 text-center">
                <h5 className="mb-0 text-enredarte-red fw-bold">Pulseras</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-yellow py-5">
        <div className="container text-center">
          <h2 className="title-section mb-2">Últimos diseños</h2>
          <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Nuestras creaciones más recientes, tejidas a mano con pasión y
            detalle.
          </p>
          <button
            className="btn btn-outline-dark mb-5 px-4 rounded-0"
            onClick={() => navigate("/Tienda")}
          >
            Ver todos los modelos
          </button>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {ultimosDisenos.map((p) => (
              <div key={p.id} className="col-md-4">
                <div
                  className="card border-0 bg-transparent h-100 product-card-tienda"
                  onClick={() => navigate(`/producto/${p.id}`)}
                >
                  <div
                    className="image-container shadow-sm mb-3 bg-white"
                    style={{
                      height: "350px",
                      overflow: "hidden",
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      src={
                        p.imagen ||
                        imagenesMapa[p.id] ||
                        "https://via.placeholder.com/400x500?text=EnredaArte"
                      }
                      className="card-img-top img-fluid w-100 h-100 object-fit-cover"
                      alt={p.nombre}
                    />
                  </div>

                  <div className="ps-1">
                    <h6
                      className="fw-bold text-enredarte-red mb-1"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {p.nombre}
                    </h6>
                    <p className="small text-enredarte-red opacity-75 fw-medium">
                      {/* Usamos el precio formateado si existe, sino el rango */}
                      {p.precio
                        ? `$${Number(p.precio).toLocaleString("es-CL")}`
                        : p.rango_precio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
