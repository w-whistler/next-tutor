import { createContext, useState, useEffect, useRef } from "react";

var STORAGE_KEY = "store_wishlist";

export var WishlistContext = createContext();

export function WishlistProvider(props) {
  var children = props.children;
  var _useState = useState([]),
    likedIds = _useState[0],
    setLikedIds = _useState[1];
  var loadedRef = useRef(false);

  useEffect(function () {
    try {
      var s = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
      if (s) {
        var parsed = JSON.parse(s);
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
      var i = prev.indexOf(productId);
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
