import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === product.id);
            if(existing) {
                return prev.map(i =>
                    i.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev =>
            prev.filter(i => i.id !== productId)
        );
    };

    const updateQuantity = (productId, quantity) => {
        if(quantity === 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prev =>
            prev.map(i =>
                i.id === productId ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
    );

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalAmount,
            totalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);