import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileService } from "../services/authService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser as setUserAction, setLoading, logout as logoutAction } from "../store/authSlice";
import type { RootState } from "../store/store";
import type { User } from "../types/auth.types";
import { saveUser } from "../utils/storage";

type AuthCtx = {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthCtx>({
  user: null,
  setUser: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  const setUser = (u: User | null) => dispatch(setUserAction(u));

  // persist user to localStorage
  useEffect(() => {
    if (user) saveUser(user);
    else localStorage.removeItem("user");
  }, [user]);

  // If there's a token but no user (page refresh or OAuth callback), validate it
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    console.log("🔍 AuthContext mount - checking token:", !!token ? "✅ Found" : "❌ Missing");
    
    // If no token, stop loading
    if (!token) {
      console.log("⚠️  No token found, stopping");
      dispatch(setLoading(false));
      return;
    }
    
    // If user already in Redux state, stop loading
    if (user) {
      console.log("✅ User already in Redux state:", user);
      dispatch(setLoading(false));
      return;
    }
    
    // If user exists in localStorage, load it into Redux without re-validating
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("✅ Loading user from localStorage:", parsedUser);
        dispatch(setUserAction(parsedUser));
        dispatch(setLoading(false));
        return;
      } catch (err) {
        console.warn("Failed to parse stored user:", err);
      }
    }
    
    // Decode JWT directly if token exists but no stored user
    try {
      const parts = token.split(".");
      console.log("🔐 JWT parts:", parts.length);
      if (parts.length !== 3) {
        throw new Error(`Invalid JWT format: expected 3 parts, got ${parts.length}`);
      }
      
      const payload = JSON.parse(atob(parts[1]));
      console.log("📋 JWT Payload:", payload);
      
      const decodedUser: User = {
        id: payload.id || payload.sub || "unknown",
        email: payload.email || "unknown",
        name: payload.name || payload.email || "User",
        role: (payload.role || "user") as "admin" | "user" | string,
      };
      console.log("✅ User decoded from JWT token:", decodedUser);
      dispatch(setUserAction(decodedUser));
      dispatch(setLoading(false));
      return;
    } catch (err) {
      console.error("❌ Failed to decode JWT from token:", err);
    }
    
    // Fallback: validate with backend if JWT decode fails
    console.log("📡 Falling back to backend validation");
    dispatch(setLoading(true));
    profileService()
      .then((u) => {
        console.log("✅ Profile validated from backend:", u);
        dispatch(setUserAction(u));
      })
      .catch((err) => {
        console.warn("Profile validation failed:", err);
        localStorage.removeItem("token");
        dispatch(setUserAction(null));
      })
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]); // Only run once on mount

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutAction());
    // redirect to login/register
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
