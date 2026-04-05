import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import logo from "../assets/img/logo-enredaarte.png";

const Navbar = () => {
  const { cart, user, setUser, favorites, token, setToken } = useContext(ProductContext);
  const navigate = useNavigate();
  const totalItems = (cart || []).reduce((acc, item) => acc + (Number(item.count) || 0), 0);

  const handleLogout = () => {
    if (typeof setUser === 'function') { 
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }
};

  return (
    <nav className="fixed-top shadow-sm">
      <div className="bg-enredarte-red text-white text-center py-2 small fw-light">
        Bienvenid@s a una experiencia diferente!!!
      </div>

      <div className="bg-enredarte-cream py-3">
        <div className="container-fluid px-5 d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none text-dark"
          >
            <img
              src={logo}
              alt="Logo"
              width="50"
              className="me-2 rounded-circle"
            />
            <span className="fs-4 fw-bold letter-spacing-1">EnredaArte</span>
          </Link>

          <div className="d-none d-md-flex gap-4 align-items-center">
            <Link to="/" className="nav-link-custom">
              Inicio
            </Link>
            <Link to="/tienda" className="nav-link-custom">
              Tienda
            </Link>
            <Link to="/nosotros" className="nav-link-custom">
              Nosotros
            </Link>

            {token ? (
              <button
                onClick={handleLogout}
                className="btn btn-link nav-link-custom border-0 p-0 text-decoration-none"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link to="/login" className="nav-link-custom fw-bold text-dark">
                Iniciar sesión
              </Link>
            )}
            {user?.rol === "admin" && (
              <li className="nav-item">
                <Link
                  to="/admin"
                  className="nav-link fw-bold"
                  style={{ color: "#a65151" }}
                >
                  <i className="bi bi-gear-fill me-1"></i> Admin
                </Link>
              </li>
            )}
          </div>

          <div className="d-flex align-items-center gap-4">
            <Link
              to="/carrito"
              className="text-decoration-none text-dark position-relative"
            >
              <i className="bi bi-bag fs-5"></i>
              <span className="ms-2 fw-bold">{totalItems}🛒</span>
            </Link>

            {user && (
              <div className="d-flex align-items-center">
                <Link
                  to="/favoritos"
                  className="nav-link text-enredarte-red ms-3 position-relative"
                >
                  <i className="bi bi-heart-fill fs-4"></i>
                  {favorites?.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {favorites?.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/perfil"
                  className="nav-link text-enredarte-red ms-4 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-person-circle fs-4"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
