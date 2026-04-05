import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Vistas Públicas
import Home from './views/Home';
import Login from './views/Login';
import Registro from './views/Registro';
import DetalleProducto from './views/DetalleProducto';
import Footer from './components/Footer';
import Tienda from './views/Tienda';

// Vistas Privadas
import Carrito from './views/Carrito';
import Perfil from './views/Perfil';
import Favoritos from './views/Favoritos';
import AdminPanel from './views/AdminPanel';
import Checkout from './views/Checkout';

function App() {
  return (
    <>
      <Navbar />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/tienda" element={<Tienda />} />

          <Route path="/carrito" element={<Carrito />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/checkout" element={<Checkout />} />
          
          <Route path="*" element={<div className="text-center mt-5"><h2>404: Página no encontrada</h2></div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;