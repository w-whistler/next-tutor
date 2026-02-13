import { createContext, useState, useEffect, useRef, useMemo, useCallback } from "react";

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

  const isLiked = useCallback(
    function (productId) {
      return likedIds.indexOf(productId) >= 0;
    },
    [likedIds]
  );

  const toggleLike = useCallback(function (productId) {
    setLikedIds(function (prev) {
      const i = prev.indexOf(productId);
      if (i >= 0) return prev.slice(0, i).concat(prev.slice(i + 1));
      return prev.concat([productId]);
    });
  }, []);

  const value = useMemo(
    function () {
      return { likedIds, isLiked, toggleLike };
    },
    [likedIds, isLiked, toggleLike]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
