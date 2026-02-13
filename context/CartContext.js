import { createContext, useState, useEffect, useRef, useMemo, useCallback } from "react";

const STORAGE_KEY = "store_cart";

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState([]);
  const loadedRef = useRef(false);

  useEffect(function () {
    try {
      const s = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
      if (s) {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (e) {}
    loadedRef.current = true;
  }, []);

  useEffect(function () {
    if (!loadedRef.current) return;
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      }
    } catch (e) {}
  }, [cart]);

  const addToCart = useCallback(function (product) {
    setCart(function (prev) {
      return [].concat(prev, [product]);
    });
  }, []);

  const value = useMemo(
    function () {
      return { cart, addToCart, setCart };
    },
    [cart, addToCart, setCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
