import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const cartReducer = (state, action) => {
  console.log('Cart reducer called with action:', action.type, action.payload);
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
        console.log('Updated existing item, new state:', newState);
        return newState;
      }
      const newState = { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
      console.log('Added new item, new state:', newState);
      return newState;
    }
    case 'REMOVE_ITEM': {
      const newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
      console.log('Removed item, new state:', newState);
      return newState;
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const normalizedQuantity = Math.max(1, Number(quantity) || 1);
      const newState = {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity: normalizedQuantity } : item
        ),
      };
      console.log('Updated quantity, new state:', newState);
      return newState;
    }
    case 'SET_CART':
      const newState = { ...state, items: action.payload };
      console.log('Set cart, new state:', newState);
      return newState;
    default:
      return state;
  }
};

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const addItemToCart = (product) => {
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: window.location.pathname } } });
      return;
    }
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  // Load user's cart from Firestore when they log in
  useEffect(() => {
    if (currentUser) {
      console.log('User logged in:', currentUser.uid);
      const userCartRef = doc(db, 'carts', currentUser.uid);
      
      // Listen for real-time updates to the user's cart
      const unsubscribe = onSnapshot(userCartRef, (doc) => {
        console.log('Cart document:', doc.exists() ? doc.data() : 'No cart found');
        if (doc.exists()) {
          const cartData = doc.data();
          console.log('Loading cart items:', cartData.items);
          if (cartData.items && Array.isArray(cartData.items)) {
            dispatch({ type: 'SET_CART', payload: cartData.items });
          } else {
            console.log('Invalid cart data, starting with empty cart');
            dispatch({ type: 'SET_CART', payload: [] });
          }
        } else {
          // If no cart exists, start with empty cart
          console.log('No cart found, starting with empty cart');
          dispatch({ type: 'SET_CART', payload: [] });
        }
      }, (error) => {
        console.error('Error loading cart:', error);
        // On error, start with empty cart
        dispatch({ type: 'SET_CART', payload: [] });
      });

      return () => unsubscribe();
    } else {
      // Clear cart when user logs out
      console.log('User logged out, clearing cart');
      dispatch({ type: 'SET_CART', payload: [] });
    }
  }, [currentUser]);

  // Save cart to Firestore whenever cart changes
  useEffect(() => {
    if (currentUser && state.items.length >= 0) {
      console.log('Saving cart to Firestore:', state.items);
      const userCartRef = doc(db, 'carts', currentUser.uid);
      setDoc(userCartRef, {
        items: state.items,
        updatedAt: new Date().toISOString()
      }, { merge: true }).then(() => {
        console.log('Cart saved successfully');
      }).catch((error) => {
        console.error('Error saving cart:', error);
      });
    }
  }, [state.items, currentUser]);

  // Debug cart state changes
  useEffect(() => {
    console.log('Cart state updated:', state.items);
  }, [state.items]);

  return <CartContext.Provider value={{ state, dispatch, addItemToCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};