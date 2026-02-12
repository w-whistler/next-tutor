import { createContext, useState, useEffect, useRef } from "react";

const STORAGE_KEY = "store_wishlist";

export const WishlistContext = createContext();

export function WishlistProvider(props) {
  const { children } = props;
  const [likedIds, setLikedIds] = useState([]);
  const loadedRef = useRef(false);

  useEffect(function () {
    try {
      const s = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
      if (s) {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) setLikedIds(parsed);
      }
    } catch (e) {}
    loadedRef.current = true;
  }, []);

  useEffect(function () {
    if (!loadedRef.current) return;
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(likedIds));
      }
    } catch (e) {}
  }, [likedIds]);

  function isLiked(productId) {
    return likedIds.indexOf(productId) >= 0;
  }

  function toggleLike(productId) {
    setLikedIds(function (prev) {
      const i = prev.indexOf(productId);
      if (i >= 0) return prev.slice(0, i).concat(prev.slice(i + 1));
      return prev.concat([productId]);
    });
  }

  return (
    <WishlistContext.Provider value={{ likedIds, isLiked, toggleLike }}>
      {children}
    </WishlistContext.Provider>
  );
}
