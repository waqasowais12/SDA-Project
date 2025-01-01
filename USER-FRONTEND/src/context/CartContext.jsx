// context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartItemsCount, setCartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};
