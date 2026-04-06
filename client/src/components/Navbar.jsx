import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import logo from "../assets/img/logo-enredaarte.png";

const Navbar = () => {
  const { cart, user, setUser, favorites, token, setToken } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = (cart || []).reduce(
    (acc, item) => acc + (Number(item.count) || 0),
    0,
  );

  const handleLogout = () => {
    if (typeof setUser === "function") {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsMenuOpen(false);
      navigate("/");
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed-top shadow-sm navbar navbar-expand-md p-0 flex-column">
      {/* Banner superior */}
      <div className="bg-enredarte-red text-white text-center py-2 small fw-light w-100">
        Bienvenid@s a una experiencia diferente!!!
      </div>

      <div className="bg-enredarte-cream py-3 w-100">
        <div className="container-fluid px-lg-5 d-flex align-items-center justify-content-between">
          {/* LOGO */}
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none text-dark"
            onClick={closeMenu}
          >
            <img
              src={logo}
              alt="Logo"
              width="50"
              className="me-2 rounded-circle"
            />
            <span className="fs-4 fw-bold letter-spacing-1">EnredaArte</span>
          </Link>

          {/* BOTÓN HAMBURGUESA (Solo visible en móvil) */}
          <button
            className="navbar-toggler border-0 shadow-none d-md-none"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i
              className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"} fs-2 text-dark`}
            ></i>
          </button>

          {/* MENÚ DE LINKS (Colapsable en móvil) */}
          <div
            className={`${isMenuOpen ? "d-flex" : "d-none"} d-md-flex flex-column flex-md-row position-absolute position-md-static top-100 start-0 w-100 w-md-auto bg-enredarte-cream p-4 p-md-0 gap-4 align-items-center z-3 shadow-sm shadow-md-none`}
          >
            <Link
              to="/"
              className="nav-link-custom text-decoration-none text-dark"
              onClick={closeMenu}
            >
              Inicio
            </Link>
            <Link
              to="/tienda"
              className="nav-link-custom text-decoration-none text-dark"
              onClick={closeMenu}
            >
              Tienda
            </Link>
            <Link
              to="/nosotros"
              className="nav-link-custom text-decoration-none text-dark"
              onClick={closeMenu}
            >
              Nosotros
            </Link>

            {token ? (
              <button
                onClick={handleLogout}
                className="btn btn-link nav-link-custom border-0 p-0 text-decoration-none text-dark"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="nav-link-custom fw-bold text-dark text-decoration-none"
                onClick={closeMenu}
              >
                Iniciar sesión
              </Link>
            )}

            {user?.rol === "admin" && (
              <Link
                to="/admin"
                className="nav-link fw-bold text-decoration-none"
                style={{ color: "#a65151" }}
                onClick={closeMenu}
              >
                <i className="bi bi-gear-fill me-1"></i> Admin
              </Link>
            )}
          </div>

          {/* ICONOS (Siempre visibles) */}
          <div className="d-flex align-items-center gap-3">
            <Link
              to="/carrito"
              className="text-decoration-none text-dark position-relative"
              onClick={closeMenu}
            >
              <i className="bi bi-bag fs-5"></i>
              <span className="ms-1 fw-bold">{totalItems}🛒</span>
            </Link>

            {user && (
              <div className="d-flex align-items-center gap-3">
                <Link
                  to="/favoritos"
                  className="nav-link text-enredarte-red position-relative"
                  onClick={closeMenu}
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
                  className="nav-link text-enredarte-red"
                  onClick={closeMenu}
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
