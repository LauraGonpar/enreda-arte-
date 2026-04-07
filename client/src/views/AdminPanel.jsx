import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import Swal from "sweetalert2";

const AdminPanel = () => {
  const { products, setProducts, token, updateProduct } =
    useContext(ProductContext);

  const [tab, setTab] = useState("inventario");
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
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
        const response = await fetch("https://enreda-arte.onrender.com/users", {
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

  const iniciarEdicion = (producto) => {
    setEditando(producto.id);
    setNuevoProducto({ ...producto });
  };

  const ejecutarGuardado = async (id) => {
    await updateProduct(id, nuevoProducto);
    setEditando(null);
    setNuevoProducto({
      nombre: "", precio: "", descripcion: "", stock: "", categoria: "", imagen: "", color: ""
    });
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://enreda-arte.onrender.com/products", {
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
          nombre: "", precio: "", descripcion: "", stock: "", categoria: "", imagen: "", color: "",
        });

        Swal.fire({
          title: "¡Joya Agregada!",
          text: `${productoCreado.nombre} ya está en la vitrina de EnredaArte.`,
          icon: "success",
          confirmButtonColor: "#b38e6d",
        });
      } else {
        Swal.fire("Error", "No se pudo agregar el producto", "error");
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
          <div className="card border-0 shadow-sm p-3 sticky-top" style={{ top: "100px" }}>
            <h5 className="fw-bold text-dark mb-4 text-center">Panel EnredaArte</h5>
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
            {tab === "inventario" && (
              <div>
                <h4 className="fw-bold mb-4">Gestión de Productos</h4>
                <div className="mb-5">
                  <form onSubmit={agregarProducto} className="row g-3 p-3 bg-light rounded shadow-sm">
                    <div className="col-md-6">
                      <label className="small fw-bold">Nombre de la pieza</label>
                      <input type="text" name="nombre" className="form-control" value={nuevoProducto.nombre} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="small fw-bold">Precio ($)</label>
                      <input type="number" name="precio" className="form-control" value={nuevoProducto.precio} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold">Stock disponible</label>
                      <input type="number" name="stock" className="form-control" value={nuevoProducto.stock} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold">Color / Piedra</label>
                      <input type="text" name="color" className="form-control" value={nuevoProducto.color} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold">Categoría</label>
                      <input type="text" name="categoria" className="form-control" value={nuevoProducto.categoria} onChange={handleInputChange} />
                    </div>
                    <div className="col-12">
                      <label className="small fw-bold">Descripción Artesanal</label>
                      <textarea name="descripcion" className="form-control" rows="2" value={nuevoProducto.descripcion} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="col-12">
                      <label className="small fw-bold">Link de la Imagen (URL)</label>
                      <input type="text" name="imagen" className="form-control" value={nuevoProducto.imagen} onChange={handleInputChange} required />
                    </div>
                    <div className="col-12 text-end">
                      <button type="submit" className="btn btn-success px-5 fw-bold shadow-sm">Publicar en Tienda</button>
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
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          {editando === p.id ? (
                            <>
                              <td><input className="form-control form-control-sm" name="nombre" value={nuevoProducto.nombre} onChange={handleInputChange} /></td>
                              <td><input type="number" className="form-control form-control-sm" name="precio" value={nuevoProducto.precio} onChange={handleInputChange} /></td>
                              <td><input type="number" className="form-control form-control-sm" name="stock" value={nuevoProducto.stock} onChange={handleInputChange} /></td>
                              <td><input className="form-control form-control-sm" name="color" value={nuevoProducto.color} onChange={handleInputChange} /></td>
                              <td>
                                <button className="btn btn-sm btn-success me-1" onClick={() => ejecutarGuardado(p.id)}>✔️</button>
                                <button className="btn btn-sm btn-secondary" onClick={() => setEditando(null)}>❌</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <img src={p.imagen || "https://via.placeholder.com/45"} alt={p.nombre} style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "8px" }} />
                                  <span className="fw-bold">{p.nombre}</span>
                                </div>
                              </td>
                              <td>${Number(p.precio).toLocaleString("es-CL")}</td>
                              <td>{p.stock} un.</td>
                              <td>{p.color || "N/A"}</td>
                              <td>
                                <button className="btn btn-sm btn-outline-dark me-2" onClick={() => iniciarEdicion(p)}>✏️ Editar</button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "usuarios" && (
              <div>
                <h4 className="fw-bold mb-4">Comunidad EnredaArte</h4>
                <div className="row g-3">
                  {usuarios.map((u) => (
                    <div key={u.id} className="col-md-6 col-lg-4">
                      <div className="p-3 border rounded shadow-sm bg-white d-flex justify-content-between align-items-center">
                        <div>
                          <p className="mb-0 fw-bold">{u.nombre}</p>
                          <small className="text-muted">{u.email}</small>
                        </div>
                        <span className={`badge ${u.rol === "admin" ? "bg-dark" : "bg-secondary"}`}>{u.rol?.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
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