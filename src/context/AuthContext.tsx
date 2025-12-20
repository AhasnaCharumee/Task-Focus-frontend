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

  // If there's a token but no user (page refresh), validate it
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    // If no token, stop loading
    if (!token) {
      dispatch(setLoading(false));
      return;
    }
    
    // If user already in Redux state, stop loading
    if (user) {
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
    
    // Only validate with backend if we have token but no stored user
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
