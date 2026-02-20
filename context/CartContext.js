import { createContext, useState, useEffect, useRef, useMemo, useCallback, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getCart as fetchCart, setCart as syncCart } from "../lib/shopApi";
import { getCookie, setCookie, deleteCookie } from "../lib/cookies";

const COOKIE_KEY = "store_cart";

export const CartContext = createContext();

function mergeCartItems(userItems, guestItems) {
  const byId = new Map();
  (userItems || []).forEach(function (item) {
    const id = item.productId || item.id;
    if (id) byId.set(id, { ...item, quantity: item.quantity || 1 });
  });
  (guestItems || []).forEach(function (item) {
    const id = item.productId || item.id;
    if (!id) return;
    const existing = byId.get(id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
    } else {
      byId.set(id, {
        productId: id,
        title: item.title || "",
        price: item.price != null ? item.price : 0,
        sku: item.sku || "",
        quantity: item.quantity || 1,
      });
    }
  });
  return Array.from(byId.values());
}

export function CartProvider(props) {
  const { children } = props;
  const { token } = useContext(AuthContext);
  const [cart, setCartState] = useState([]);
  const loadedRef = useRef(false);
  const cartFromApiRef = useRef(false);

  // Guest: load from cookie
  useEffect(function () {
    if (token) return;
    try {
      const parsed = getCookie(COOKIE_KEY);
      if (Array.isArray(parsed)) setCartState(parsed);
    } catch (e) {}
    loadedRef.current = true;
  }, [token]);

  // Authenticated: fetch user cart, merge with guest cookie, PUT merged, then set state and clear cookie
  useEffect(function () {
    if (!token) return;
    let cancelled = false;
    const guestItems = getCookie(COOKIE_KEY);
    const guestArray = Array.isArray(guestItems) ? guestItems : [];

    fetchCart(token)
      .then(function (data) {
        if (cancelled) return;
        const userItems = Array.isArray(data.items) ? data.items : [];
        const merged = mergeCartItems(userItems, guestArray);
        if (merged.length === 0 && userItems.length === 0 && guestArray.length === 0) {
          cartFromApiRef.current = true;
          setCartState([]);
          return;
        }
        return syncCart(merged, token);
      })
      .then(function (data) {
        if (cancelled) return;
        if (data && Array.isArray(data.items)) {
          cartFromApiRef.current = true;
          setCartState(data.items);
        }
        deleteCookie(COOKIE_KEY);
      })
      .catch(function () {
        if (!cancelled) {
          fetchCart(token).then(function (d) {
            if (cancelled) return;
            const items = Array.isArray(d.items) ? d.items : [];
            cartFromApiRef.current = true;
            setCartState(items);
          }).catch(function () { setCartState([]); });
        }
      });
    loadedRef.current = true;
    return function () { cancelled = true; };
  }, [token]);

  // Guest: persist to cookie. Authenticated: sync to API (skip right after fetch/merge)
  useEffect(function () {
    if (!loadedRef.current) return;
    if (!token) {
      try {
        setCookie(COOKIE_KEY, cart);
      } catch (e) {}
      return;
    }
    if (cartFromApiRef.current) {
      cartFromApiRef.current = false;
      return;
    }
    let cancelled = false;
    syncCart(cart, token)
      .then(function (data) {
        if (!cancelled && data && Array.isArray(data.items)) {
          cartFromApiRef.current = true;
          setCartState(data.items);
        }
      })
      .catch(function () {});
    return function () { cancelled = true; };
  }, [token, cart]);

  const setCart = useCallback(function (nextCart) {
    if (typeof nextCart === "function") {
      setCartState(nextCart);
    } else {
      setCartState(Array.isArray(nextCart) ? nextCart : []);
    }
  }, []);

  const addToCart = useCallback(function (product) {
    setCartState(function (prev) {
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
