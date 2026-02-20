import { createContext, useState, useEffect, useRef, useMemo, useCallback } from "react";
import { login as apiLogin } from "../lib/shopApi";

const STORAGE_KEY_USER = "store_user";
const STORAGE_KEY_TOKEN = "store_token";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState(null);
  const loadedRef = useRef(false);

  useEffect(function () {
    try {
      if (typeof window === "undefined") return;
      const t = window.localStorage.getItem(STORAGE_KEY_TOKEN);
      const u = window.localStorage.getItem(STORAGE_KEY_USER);
      if (t && u) {
        const parsed = JSON.parse(u);
        if (parsed && typeof parsed === "object") {
          setToken(t);
          setUser(parsed);
        }
      }
    } catch (e) {}
    loadedRef.current = true;
  }, []);

  useEffect(function () {
    if (!loadedRef.current) return;
    try {
      if (typeof window !== "undefined") {
        if (token && user) {
          window.localStorage.setItem(STORAGE_KEY_TOKEN, token);
          window.localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        } else {
          window.localStorage.removeItem(STORAGE_KEY_TOKEN);
          window.localStorage.removeItem(STORAGE_KEY_USER);
        }
      }
    } catch (e) {}
  }, [token, user]);

  const login = useCallback(async function (email, password) {
    setAuthError(null);
    try {
      const data = await apiLogin(email, password);
      setToken(data.token);
      setUser(data.user);
      return { ok: true };
    } catch (e) {
      const message = e.message || "Login failed";
      setAuthError(message);
      return { ok: false, error: message };
    }
  }, []);

  const logout = useCallback(function () {
    setToken(null);
    setUser(null);
    setAuthError(null);
  }, []);

  const setSession = useCallback(function (newToken, newUser) {
    setToken(newToken);
    setUser(newUser);
    setAuthError(null);
  }, []);

  const value = useMemo(
    function () {
      return { user, token, login, logout, setSession, authError, setAuthError };
    },
    [user, token, login, logout, setSession, authError, setAuthError]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
