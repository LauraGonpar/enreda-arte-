import React from 'react';

const Nosotros = () => {
  return (
    <div className="container mt-5 pt-5 min-vh-100">
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h1 className="fw-bold display-4" style={{ color: "#b38e6d" }}>Nuestra Historia</h1>
          <div className="mx-auto mb-4" style={{ height: "3px", width: "100px", backgroundColor: "#b38e6d" }}></div>
          <p className="lead text-muted">
            EnredaArte nace de la pasión por transformar hilos de metal en piezas únicas que cuentan historias.
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img 
            src="https://i.ibb.co/B2Rxg5Vw/logo-enredaarte.png" 
            alt="Taller de alambrismo" 
            className="img-fluid rounded-4 shadow-lg"
          />
        </div>
        <div className="col-lg-6 ps-lg-5">
          <h2 className="fw-bold mb-4">El Arte del Alambrismo</h2>
          <p className="text-secondary">
            Cada una de nuestras joyas, como las colecciones <strong>Corola, Alma o Flor Imperial</strong>, es trabajada a mano mediante la técnica del alambrismo fino. No solo buscamos colores, buscamos formas que resalten la personalidad de quien las usa.
          </p>
          <p className="text-secondary">
            Para nosotros, el metal no es solo un material; es el lienzo donde capturamos la esencia de la naturaleza y la elegancia. Nuestro compromiso es ofrecer accesorios duraderos, originales y hechos con amor en cada vuelta de alambre.
          </p>
          <div className="bg-light p-4 rounded-3 border-start border-4" style={{ borderColor: "#b38e6d" }}>
            <i className="fst-italic">"La belleza está en los detalles y en la dedicación que ponemos en cada enredo."</i>
          </div>
        </div>
      </div>

      <div className="row text-center g-4 mb-5">
        <div className="col-md-4">
          <div className="p-4 h-100 shadow-sm rounded-4 bg-white">
            <div className="fs-1 mb-3">🛠️</div>
            <h4 className="fw-bold">100% Artesanal</h4>
            <p className="text-muted small">Sin moldes ni procesos industriales. Cada pieza es irrepetible.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 h-100 shadow-sm rounded-4 bg-white">
            <div className="fs-1 mb-3">💎</div>
            <h4 className="fw-bold">Calidad</h4>
            <p className="text-muted small">Seleccionamos los mejores metales y piedras para que tu joya brille por siempre.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 h-100 shadow-sm rounded-4 bg-white">
            <div className="fs-1 mb-3">✨</div>
            <h4 className="fw-bold">Diseño Único</h4>
            <p className="text-muted small">Creamos formas orgánicas inspiradas en la geometría de la naturaleza.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;