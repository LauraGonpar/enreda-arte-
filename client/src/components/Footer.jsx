import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light pt-5 mt-5 border-top">
      <div className="container">
        <div className="row">
       
          <div className="col-md-5 mb-4">
            <h2 className="fw-bold mb-3">Registrate para recibir novedades</h2>
            <div className="input-group mb-3 border p-1 rounded bg-white" style={{ maxWidth: '400px' }}>
              <input 
                type="email" 
                className="form-control border-0 shadow-none" 
                placeholder="Correo Electrónico" 
              />
              <button className="btn btn-link text-dark fw-bold text-decoration-none shadow-none" type="button">
                Sign Up
              </button>
            </div>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Redes sociales</h6>
            <ul className="list-unstyled text-muted small">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>TikTok</li>
              <li>Pinterest</li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Sobre nosotros</h6>
            <ul className="list-unstyled text-muted small">
              <li>Nuestra Historia</li>
              <li>Técnica de Alambrismo</li>
              <li>Talleres</li>
              <li>Sustentabilidad</li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Contáctanos</h6>
            <ul className="list-unstyled text-muted small">
              <li>WhatsApp</li>
              <li>Email</li>
              <li>Ubicación</li>
              <li>Preguntas frecuentes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom py-3 mt-4">
        <div className="container text-center text-white small">
          ENREDAARTE.COM 2026 DERECHOS RESERVADOS
        </div>
      </div>
    </footer>
  );
};

export default Footer;