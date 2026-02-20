import { createContext, useState, useEffect, useRef, useMemo, useCallback, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getFavorites as fetchFavorites, setFavorites as syncFavorites } from "../lib/shopApi";
import { getCookie, setCookie, deleteCookie } from "../lib/cookies";

const COOKIE_KEY = "store_wishlist";

export const WishlistContext = createContext();

function mergeFavorites(userIds, guestIds) {
  const set = new Set([].concat(userIds || [], guestIds || []).filter(Boolean));
  return Array.from(set);
}

export function WishlistProvider(props) {
  const { children } = props;
  const { token } = useContext(AuthContext);
  const [likedIds, setLikedIdsState] = useState([]);
  const loadedRef = useRef(false);
  const favoritesFromApiRef = useRef(false);

  // Guest: load from cookie
  useEffect(function () {
    if (token) return;
    try {
      const parsed = getCookie(COOKIE_KEY);
      if (Array.isArray(parsed)) setLikedIdsState(parsed);
    } catch (e) {}
    loadedRef.current = true;
  }, [token]);

  // Authenticated: fetch user favorites, merge with guest cookie, PUT merged, then set state and clear cookie
  useEffect(function () {
    if (!token) return;
    let cancelled = false;
    const guestIds = getCookie(COOKIE_KEY);
    const guestArray = Array.isArray(guestIds) ? guestIds : [];

    fetchFavorites(token)
      .then(function (data) {
        if (cancelled) return;
        const userIds = Array.isArray(data.productIds) ? data.productIds : [];
        const merged = mergeFavorites(userIds, guestArray);
        if (merged.length === 0 && userIds.length === 0 && guestArray.length === 0) {
          favoritesFromApiRef.current = true;
          setLikedIdsState([]);
          return Promise.resolve({ productIds: [] });
        }
        return syncFavorites(merged, token);
      })
      .then(function (data) {
        if (cancelled) return;
        if (data && Array.isArray(data.productIds)) {
          favoritesFromApiRef.current = true;
          setLikedIdsState(data.productIds);
        }
        deleteCookie(COOKIE_KEY);
      })
      .catch(function () {
        if (!cancelled) {
          fetchFavorites(token).then(function (d) {
            if (cancelled) return;
            const ids = Array.isArray(d.productIds) ? d.productIds : [];
            favoritesFromApiRef.current = true;
            setLikedIdsState(ids);
          }).catch(function () { setLikedIdsState([]); });
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
        setCookie(COOKIE_KEY, likedIds);
      } catch (e) {}
      return;
    }
    if (favoritesFromApiRef.current) {
      favoritesFromApiRef.current = false;
      return;
    }
    let cancelled = false;
    syncFavorites(likedIds, token)
      .then(function (data) {
        if (!cancelled && data && Array.isArray(data.productIds)) {
          favoritesFromApiRef.current = true;
          setLikedIdsState(data.productIds);
        }
      })
      .catch(function () {});
    return function () { cancelled = true; };
  }, [token, likedIds]);

  const isLiked = useCallback(
    function (productId) {
      return likedIds.indexOf(productId) >= 0;
    },
    [likedIds]
  );

  const toggleLike = useCallback(function (productId) {
    setLikedIdsState(function (prev) {
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
