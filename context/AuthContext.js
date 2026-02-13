import { createContext, useState, useEffect, useRef, useMemo, useCallback } from "react";

const STORAGE_KEY = "store_user";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const loadedRef = useRef(false);

  useEffect(function () {
    try {
      const s = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed && typeof parsed === "object") setUser(parsed);
      }
    } catch (e) {}
    loadedRef.current = true;
  }, []);

  useEffect(function () {
    if (!loadedRef.current) return;
    try {
      if (typeof window !== "undefined") {
        if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        else window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {}
  }, [user]);

  const login = useCallback(function (credentials) {
    setUser({ email: credentials.email || "user@example.com", name: credentials.name || "User" });
  }, []);

  const logout = useCallback(function () {
    setUser(null);
  }, []);

  const value = useMemo(
    function () {
      return { user, login, logout };
    },
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
