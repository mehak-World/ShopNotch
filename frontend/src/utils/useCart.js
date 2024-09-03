import { useState, useEffect } from 'react';
import axios from 'axios';

const useCart = (token) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) {
      fetchCartData();
    }
  }, [token]);

  const fetchCartData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data[0]) {
        setCart(response.data[0].items);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return { cart, setCart, fetchCartData };
};

export default useCart;
