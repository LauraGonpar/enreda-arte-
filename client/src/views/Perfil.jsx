import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Swal from "sweetalert2"; 
import logoPerfilDefault from "../assets/img/logo-ea.png"; 

const Perfil = () => {
  const {user} = useContext(ProductContext);

  if (!user) {
    return <div className="container mt-5 pt-5 text-center">Inicia sesión para ver tu perfil.</div>;
  }

  const handleSaveChanges = (e) => {
    e.preventDefault();
    Swal.fire("¡Cambios Guardados!", "Tus datos han sido actualizados en EnredaArte.", "success");
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0 shadow-lg overflow-hidden rounded-4 mt-5">
      <div className="col-md-5 bg-enredarte-red d-flex flex-column justify-content-center align-items-center text-white p-5">
        <div className="logo-perfil-container mb-4">
          <img 
            src={logoPerfilDefault} 
            alt="Perfil" 
            className="rounded-circle shadow-lg" 
            width="200" 
            height="200"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h1 className="display-6 fw-bold mb-3">{user.nombre}</h1>
        <p className="text-center opacity-75 mb-5 small">Numero de usuario: {user.id}</p>
        <button className="btn btn-brown px-4 py-2 small fw-bold shadow">
          Cambiar la foto
        </button>
      </div>
      <div className="col-md-7 bg-enredarte-cream d-flex flex-column justify-content-center p-5">
        <h2 className="fw-bold mb-5 title-section">Editar Perfil</h2>
        
        <form onSubmit={handleSaveChanges} style={{ maxWidth: "600px" }}>
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Nombres</label>
              <input type="text" className="form-control border-0 py-2 shadow-sm bg-input-perfil" placeholder="Lola" defaultValue={user.nombre.split(' ')[0]} />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Apellidos</label>
              <input type="text" className="form-control border-0 py-2 shadow-sm bg-input-perfil" placeholder="Pérez" defaultValue={user.nombre.split(' ')[1]} />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <label className="form-label small fw-bold text-muted">Correo electrónico (no editable)</label>
              <input type="email" className="form-control border-0 py-2 shadow-sm bg-input-perfil" value={user.email} disabled />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Nueva Contraseña</label>
              <input type="password" className="form-control border-0 py-2 shadow-sm bg-input-perfil" placeholder="************" />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Confirmar contraseña</label>
              <input type="password" className="form-control border-0 py-2 shadow-sm bg-input-perfil" placeholder="************" />
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Fecha de Nacimiento</label>
              <input type="date" className="form-control border-0 py-2 shadow-sm bg-input-perfil" defaultValue="1993-01-15" />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-brown w-50 py-3 fw-bold shadow mt-2">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Perfil;