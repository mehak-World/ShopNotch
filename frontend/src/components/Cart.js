import React, { useEffect, useState, useRef } from 'react';
import { removeCartItem, updateCartItem } from '../utils/cartUtilities';
import useCart from '../utils/useCart';

const Cart = () => {
  const token = localStorage.getItem("token");
  const { cart, setCart, fetchCartData } = useCart(token);
  const quantityRefs = useRef([]); // Array of refs
  
  const handleRemoveItem = async (id) => {
    try {
      const result = await removeCartItem(id, token);
      if (result.success) {
        setCart(cart.filter(item => item.product._id !== id));
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleUpdate = async (id, index) => {
    const quantity = quantityRefs.current[index].value;

    // Optimistically update the cart state
    setCart(prevCart => prevCart.map(
      item => item.product._id === id ? { ...item, quantity: parseInt(quantity) } : item
    ));

    try {
      await updateCartItem(id, quantity, token);
      fetchCartData(); // Optionally refetch data to ensure consistency
    } catch (error) {
      // Handle error
    }
  };

  if (!cart) return null;

  return (
    <div className="m-3 mt-3 p-3">
      <h1 className="text-center text-3xl font-bold text-gray-600 mb-20">Cart</h1>
      {cart.map((item, index) => (
        <div key={item._id} className="flex gap-40 justify-center shadow-lg mb-6 p-2">
          <div className="w-40 h-40">
            <img src={item.product.image} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="flex gap-4 justify-between">
              <h2 className="text-xl font-bold text-gray-600 mb-2">{item.product.name}</h2>
              <button
                className="bg-red-500 text-white p-2 rounded-lg mb-2"
                onClick={() => handleRemoveItem(item.product._id)}
              >
                Remove Item
              </button>
            </div>

            <h2 className="text-xl text-gray-600 mb-4">${item.product.price}</h2>
            <h2 className="text-gray-600 mb-3">Quantity: {item.quantity}</h2>

            <input
              ref={(el) => (quantityRefs.current[index] = el)} // Assign ref for each item
              type="number"
              placeholder="enter quantity"
              defaultValue={item.quantity} // Set initial quantity value
              className="p-2 mr-2"
            />
            <button
              className="bg-orange-400 p-2 text-white rounded-lg"
              onClick={() => handleUpdate(item.product._id, index)}
            >
              Update Quantity
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
