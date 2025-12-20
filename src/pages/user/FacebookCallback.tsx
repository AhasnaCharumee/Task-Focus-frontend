import { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { profileService } from "../../services/authService";
import { useAppDispatch } from "../../store/hooks";
import { setUser as setReduxUser, setLoading } from "../../store/authSlice";

// Admin email list - users with these emails will have admin role
const ADMIN_EMAILS = ["focusai.reminder.bot@gmail.com"];

export default function FacebookCallback() {
  const nav = useNavigate();
  const { setUser } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const token = searchParams.get("token");
        const email = searchParams.get("email");
        const name = searchParams.get("name");
        const errorParam = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        console.log("🔵 Facebook callback received:", { token, email, name, errorParam, errorDescription });
        console.log("🔵 URL:", window.location.href);

        // Check for backend errors
        if (errorParam) {
          const errorMsg = errorDescription || errorParam || "Facebook authentication failed";
          console.error("❌ Backend error:", errorMsg);
          setError(errorMsg);
          setTimeout(() => nav("/login", { replace: true }), 3000);
          return;
        }

        if (!token) {
          console.error("❌ No token in callback URL");
          console.log("🔵 Available params:", {
            token: searchParams.get("token"),
            email: searchParams.get("email"),
            name: searchParams.get("name"),
          });
          setError("Authentication failed: No token received from backend");
          setTimeout(() => nav("/login", { replace: true }), 3000);
          return;
        }

        // Validate token format (should be JWT)
        if (!token.startsWith("eyJ")) {
          console.warn("⚠️ Token doesn't look like a valid JWT:", token.substring(0, 20));
        }

        // Save token to localStorage FIRST
        localStorage.setItem("token", token);
        console.log("✅ Token saved to localStorage:", token.substring(0, 50) + "...");

        // Try to fetch user profile with the token
        try {
          console.log("🔵 Fetching user profile...");
          const userObj = await profileService();
          console.log("✅ Profile fetched:", userObj);
          
          if (userObj) {
            localStorage.setItem("user", JSON.stringify(userObj));
            
            // Check if user email is in admin list and update role if needed
            if (userObj.email && ADMIN_EMAILS.includes(userObj.email)) {
              console.log("🔐 Admin email detected, setting admin role");
              userObj.role = "admin";
              localStorage.setItem("user", JSON.stringify(userObj));
            }
            
            // Update BOTH context AND Redux
            setUser(userObj);
            dispatch(setReduxUser(userObj));
            dispatch(setLoading(false));
            
            console.log("✅ User saved to context and Redux");

            // Wait a tick for state to settle before redirecting
            await new Promise(resolve => setTimeout(resolve, 100));

            // Redirect based on role
            if (userObj.role === "admin") {
              console.log("✅ Redirecting admin to dashboard");
              nav("/admin/dashboard", { replace: true });
              return;
            }
            
            console.log("✅ Redirecting user to tasks");
            nav("/tasks", { replace: true });
            return;
          } else {
            console.warn("⚠️ Profile response was empty");
          }
        } catch (profileErr: any) {
          console.warn("⚠️ Profile fetch failed, using callback data instead");
          console.error("Profile error details:", profileErr?.message);
          
          // Fallback: use data from callback with required id field
          let fallbackUser: any = { 
            id: email || "fb-user",
            email: email || "",
            name: name || "Facebook User",
            role: "user" 
          };
          
          // Check if email is in admin list
          if (email && ADMIN_EMAILS.includes(email)) {
            console.log("🔐 Admin email detected in fallback, setting admin role");
            fallbackUser.role = "admin";
          }
          
          console.log("✅ Using fallback user:", fallbackUser);
          localStorage.setItem("user", JSON.stringify(fallbackUser));
          
          // Update BOTH context AND Redux
          setUser(fallbackUser);
          dispatch(setReduxUser(fallbackUser));
          dispatch(setLoading(false));
          
          // Wait a tick for state to settle
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Redirect based on role
          if (fallbackUser.role === "admin") {
            console.log("✅ Redirecting admin to dashboard (fallback)");
            nav("/admin/dashboard", { replace: true });
            return;
          }
          
          console.log("✅ Redirecting user to tasks (fallback)");
          nav("/tasks", { replace: true });
          return;
        }
      } catch (err: any) {
        console.error("❌ Facebook callback error:", err);
        console.error("Error stack:", err?.stack);
        setError("An unexpected error occurred. Please try again.");
        setTimeout(() => nav("/login", { replace: true }), 3000);
      }
    };

    // Only process if we have search params
    if (searchParams.toString()) {
      console.log("🔵 Processing Facebook callback...");
      processCallback();
    } else {
      console.warn("⚠️ No search parameters in URL");
    }
  }, [searchParams, nav, setUser]);

  return (
    <div style={{ textAlign: "center", padding: "2rem", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
      {error ? (
        <>
          <div style={{ 
            backgroundColor: "#fee2e2", 
            padding: "2rem", 
            borderRadius: "8px", 
            maxWidth: "500px",
            border: "2px solid #dc2626"
          }}>
            <h2 style={{ color: "#dc2626", marginTop: 0 }}>⚠️ {error}</h2>
            <p style={{ color: "#7f1d1d", marginBottom: 0 }}>Redirecting to login in 3 seconds...</p>
          </div>
        </>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem"
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "4px solid #e5e7eb",
            borderTop: "4px solid #4f46e5",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
          <h2 style={{ color: "#1f2937" }}>Processing login...</h2>
          <p style={{ color: "#6b7280" }}>Authenticating with Facebook...</p>
          <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2rem" }}>
            Check browser console (F12) for detailed logs
          </p>
        </div>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
