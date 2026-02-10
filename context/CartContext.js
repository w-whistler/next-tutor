import { createContext, useState, useEffect, useRef } from "react";

var STORAGE_KEY = "store_cart";

export var CartContext = createContext();

export function CartProvider(props) {
  var children = props.children;
  var _useState = useState([]),
    cart = _useState[0],
    setCart = _useState[1];
  var loadedRef = useRef(false);

  useEffect(function () {
    try {
      var s = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
      if (s) {
        var parsed = JSON.parse(s);
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

  function addToCart(product) {
    setCart([].concat(cart, [product]));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
