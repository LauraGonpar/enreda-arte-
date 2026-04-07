import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const toggleFavorite = async (product) => {
  if (!user || !token) {
    Swal.fire("Inicia sesión", "Debes estar logueado para guardar favoritos", "warning");
    return;
  }

  try {
    const response = await fetch("https://enreda-arte.onrender.com/favoritos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        user_id: user.id, 
        product_id: product.id 
      }),
    });

    if (response.ok) {
      setFavorites((prev) => {
        const isFav = prev.some((fav) => fav.id === product.id);
        return isFav ? prev.filter((f) => f.id !== product.id) : [...prev, product];
      });
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, count: (item.count || 1) + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, count: 1 }];
      }
    });

    console.log("Producto agregado:", product.nombre);
  };
const updateProduct = async (id, updatedData) => {
  try {
    const response = await fetch(`https://enreda-arte.onrender.com/products/${id}`, {
      method: "PUT", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const data = await response.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? data.producto : p)));
      Swal.fire("¡Éxito!", "La joya ha sido actualizada en la base de datos.", "success");
    }
  } catch (error) {
    console.error("Error al conectar con Render:", error);
  }
};
  const getProducts = async () => {
    try {
      const response = await fetch("https://enreda-arte.onrender.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al conectar con el servidor de EnredaArte:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (token) {
      const fetchFavorites = async () => {
        try {
          const response = await fetch("https://enreda-arte.onrender.com/favoritos", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setFavorites(data); 
          }
        } catch (error) {
          console.error("Error al traer favoritos:", error);
        }
      };
      fetchFavorites();
    } else {
      setFavorites([]); }
  }, [token]);

  const login = (userToken, userData) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("favs"); 
    Swal.fire("¡Hasta luego!", "Has cerrado sesión correctamente.", "success");
  };
  const updateQuantity = (id, newCount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: newCount } : item,
      ),
    );
  };



  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce(
    (acc, item) => acc + Number(item.precio || 0) * (Number(item.count) || 1),
    0,
  );
  const globalState = {
    products,
    setProducts,
    cart,
    setCart,
    user,
    setUser,
    token,
    setToken,
    cartTotal,
    updateQuantity,
    removeFromCart,
    toggleFavorite,
    updateProduct,
    favorites,
    addToCart,
    login,
    logout,
  };

  return (
    <ProductContext.Provider value={globalState}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
