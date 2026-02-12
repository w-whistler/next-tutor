import { createContext, useState, useEffect, useRef } from "react";

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

  function login(credentials) {
    setUser({ email: credentials.email || "user@example.com", name: credentials.name || "User" });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
