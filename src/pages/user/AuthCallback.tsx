import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Persist token; user info will be hydrated by AuthProvider/profileService
    localStorage.setItem("token", token);

    // Optional: derive role from JWT if present to direct admin vs user
    const role = getRoleFromToken(token);
    if (role === "admin") navigate("/admin/dashboard", { replace: true });
    else navigate("/tasks", { replace: true });
  }, [navigate, params]);

  return <p style={{ textAlign: "center", marginTop: "2rem" }}>Logging you in...</p>;
}

function getRoleFromToken(token: string): string | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload));
    return decoded?.role ?? null;
  } catch (err) {
    console.warn("Failed to decode token role", err);
    return null;
  }
}
