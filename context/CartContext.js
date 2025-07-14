'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartMap, setCartMap] = useState({});
    const [orders, setOrders] = useState([]);

    // Load from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        const storedOrders = localStorage.getItem('orders');
        if (storedCart) setCartMap(JSON.parse(storedCart));
        if (storedOrders) setOrders(JSON.parse(storedOrders));
    }, []);

    // Save cart & orders
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartMap));
    }, [cartMap]);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addToCart = (item) => {
        const itemId = item.id;
        setCartMap((prev) => {
            const prevItem = prev[itemId];
            const updatedItem = prevItem
                ? { ...prevItem, quantity: prevItem.quantity + (item.quantity || 1) }
                : { ...item, quantity: item.quantity || 1 };
            return { ...prev, [itemId]: updatedItem };
        });
    };

    const removeFromCart = (itemId) => {
        setCartMap((prev) => {
            const updated = { ...prev };
            delete updated[itemId];
            return updated;
        });
    };

    const clearCart = () => setCartMap({});

    const placeOrder = () => {
        if (Object.keys(cartMap).length === 0) return;

        const newOrder = {
            id: Date.now(),
            items: Object.values(cartMap),
            date: new Date().toLocaleString(),
        };

        setOrders((prev) => [newOrder, ...prev]);
        clearCart(); // Empty cart after placing order
    };

    const cart = Object.values(cartMap);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, placeOrder, orders }}
        >
            {children}
        </CartContext.Provider>
    );
};
