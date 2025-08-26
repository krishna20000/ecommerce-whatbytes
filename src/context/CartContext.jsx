import React, { createContext, useReducer, useContext, useEffect } from 'react';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    // New case to handle removing an item
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const normalizedQuantity = Math.max(1, Number(quantity) || 1);
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity: normalizedQuantity } : item
        ),
      };
    }
    case 'SET_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // ... the rest of the file is the same
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    // This logic ensures we don't save an empty array to local storage,
    // which can be useful if you want to clear it upon logout.
    if (state.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } else if (localStorage.getItem('cart')) {
      localStorage.removeItem('cart');
    }
  }, [state.items]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};