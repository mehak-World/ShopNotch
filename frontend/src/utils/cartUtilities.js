import axios from 'axios';

export const removeCartItem = async (id, token) => {
  try {
    const response = await axios.post("http://localhost:8080/cart/deleteItem", { id }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error removing item:", error);
    throw error;
  }
};

export const updateCartItem = async (id, quantity, token) => {
  try {
    const response = await axios.post("http://localhost:8080/cart/update", { id, quantity }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
};
