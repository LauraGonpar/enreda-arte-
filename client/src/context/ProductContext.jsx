import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); 
  const [cart, setCart] = useState([]);
  
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);


const addToCart = (product) => {
  setCart((prevCart) => {
    const existingProduct = prevCart.find((item) => item.id === product.id);

    if (existingProduct) {
      return prevCart.map((item) =>
        item.id === product.id 
          ? { ...item, count: (item.count || 1) + 1 } 
          : item
      );
    } else {
      return [...prevCart, { ...product, count: 1 }];
    }
  });
  
  console.log("Producto agregado:", product.nombre);
};

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data); 
    } catch (error) {
      console.error("Error al conectar con el servidor de EnredaArte:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const login = (userToken, userData) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData)); 
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
const updateQuantity = (id, newCount) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, count: newCount } : item
    )
  );
};

const removeFromCart = (id) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== id));
};

const cartTotal = cart.reduce(
  (acc, item) => acc + Number(item.precio || 0) * (Number(item.count) || 1),
  0
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
    addToCart,
    login,
    logout
  };
  

  return (
    <ProductContext.Provider value={globalState}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;