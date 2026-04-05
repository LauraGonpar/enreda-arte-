import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import Swal from "sweetalert2";

const AdminPanel = () => {
  const { products, setProducts, imagenesMapa, token } =
    useContext(ProductContext);

  const [tab, setTab] = useState("inventario");
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
    categoria: "",
    imagen: "",
    color: "",
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          console.error("Error al cargar usuarios:", response.status);
        }
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    if (tab === "usuarios" && token) {
      fetchUsuarios();
    }
  }, [tab, token]);

  const handleInputChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

 const agregarProducto = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...nuevoProducto,
          precio: Number(nuevoProducto.precio),
          stock: Number(nuevoProducto.stock),
        }),
      });

      if (response.ok) {
        const productoCreado = await response.json();
        setProducts([...products, productoCreado]);
        setNuevoProducto({
          nombre: "",
          precio: "",
          descripcion: "",
          stock: "",
          categoria: "",
          imagen: "",
          color: "",
        });

        Swal.fire({
          title: "¡Joya Agregada!",
          text: `${productoCreado.nombre} ya está en la vitrina de EnredaArte.`,
          icon: "success",
          confirmButtonColor: "#b38e6d",
        });
      } else {
        Swal.fire(
          "Error",
          "No tienes permiso o el taller está lleno (Error de servidor)",
          "error",
        );
      }
    } catch (error) {
      console.error("Error en EnredaArte:", error);
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  };

  return (
    <div className="container-fluid bg-light pt-5 mt-5 min-vh-100 px-lg-5">
      <div className="row">
        <div className="col-md-3 col-lg-2 mb-4">
          <div
            className="card border-0 shadow-sm p-3 sticky-top"
            style={{ top: "100px" }}
          >
            <h5 className="fw-bold text-dark mb-4 text-center">
              Panel EnredaArte
            </h5>
            <div className="nav flex-column nav-pills">
              <button
                className={`nav-link mb-2 text-start ${tab === "inventario" ? "active bg-dark" : "text-dark"}`}
                onClick={() => setTab("inventario")}
              >
                📦 Inventario
              </button>
              <button
                className={`nav-link mb-2 text-start ${tab === "usuarios" ? "active bg-dark" : "text-dark"}`}
                onClick={() => setTab("usuarios")}
              >
                👥 Usuarios
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9 col-lg-10">
          <div className="card border-0 shadow-sm p-4 bg-white mb-5">

            {/* VISTA INVENTARIO */}
            {tab === "inventario" && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold m-0">Gestión de Productos</h4>
                  
                </div>

                <div className="mb-5" id="formNuevoProducto">
                  <form
                    onSubmit={agregarProducto}
                    className="row g-3 p-3 bg-light rounded shadow-sm"
                  >
                    <div className="col-md-6">
                      <label className="small fw-bold">
                        Nombre de la pieza
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        value={nuevoProducto.nombre}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: Aros Cuarzo Rosa"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small fw-bold">Precio ($)</label>
                      <input
                        type="number"
                        name="precio"
                        className="form-control"
                        value={nuevoProducto.precio}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold">Stock disponible</label>
                      <input
                        type="number"
                        name="stock"
                        className="form-control"
                        value={nuevoProducto.stock}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold">Color / Piedra</label>
                      <input
                        type="text"
                        name="color"
                        className="form-control"
                        placeholder="Ej: Turquesa"
                        value={nuevoProducto.color}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold">Categoría</label>
                      <input
                        type="text"
                        name="categoria"
                        className="form-control"
                        placeholder="Ej: aros, pulseras..."
                        value={nuevoProducto.categoria}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="small fw-bold">
                        Descripción Artesanal
                      </label>
                      <textarea
                        name="descripcion"
                        className="form-control"
                        rows="2"
                        value={nuevoProducto.descripcion}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="small fw-bold">
                        Link de la Imagen (URL)
                      </label>
                      <input
                        type="text"
                        name="imagen"
                        className="form-control"
                        placeholder="https://tusitio.com/foto-joya.jpg"
                        value={nuevoProducto.imagen}
                        onChange={handleInputChange}
                        required
                      />
                      <small className="text-muted">
                        Tip: Puedes subir tu foto a un sitio como ImgBB y pegar
                        el link aquí.
                      </small>
                    </div>
                    <div className="col-12 text-end">
                      <button
                        type="submit"
                        className="btn btn-success px-5 fw-bold shadow-sm"
                      >
                        Publicar en Tienda
                      </button>
                    </div>
                  </form>
                </div>

                <div className="table-responsive">
  <table className="table align-middle table-hover">
    <thead className="table-light">
      <tr>
        <th>Joya</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Color</th> 
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p.id}>
          <td>
            <div className="d-flex align-items-center gap-2">
              <img
                src={
                  p.imagen || 
                  imagenesMapa[p.id] || 
                  "https://img.freepik.com/vector-premium/joyeria-logotipo-alambrismo-cristales_605054-12.jpg" 
                }
                alt={p.nombre}
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <span className="fw-bold">{p.nombre}</span>
            </div>
          </td>
          <td>${Number(p.precio).toLocaleString("es-CL")}</td>
          <td>{p.stock} un.</td>
          
          <td>
            <span
              className="badge border text-dark fw-normal"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              {p.color || "N/A"}
            </span>
          </td>

          <td>
            <span
              className={`badge rounded-pill ${p.stock < 5 ? "bg-danger" : "bg-success"}`}
            >
              {p.stock < 5 ? "Bajo Stock" : "Disponible"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
              </div>
            )}

            {/* VISTA USUARIOS */}
            {tab === "usuarios" && (
              <div>
                <h4 className="fw-bold mb-4">Comunidad EnredaArte</h4>
                <div className="row g-3">
                  {usuarios.length > 0 ? (
                    usuarios.map((u) => (
                      <div key={u.id} className="col-md-6 col-lg-4">
                        <div className="p-3 border rounded shadow-sm bg-white d-flex justify-content-between align-items-center">
                          <div>
                            <p className="mb-0 fw-bold text-dark">{u.nombre}</p>
                            <small className="text-muted">{u.email}</small>
                          </div>
                          <span
                            className={`badge ${u.rol === "admin" ? "bg-dark" : "bg-secondary"}`}
                          >
                            {u.rol?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-5">
                      <p className="text-muted">
                        Cargando comunidad de clientes...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
