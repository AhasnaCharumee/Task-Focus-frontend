import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub } from "react-icons/fa";

// Google Icon Component
const GoogleIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Icon (Zap)
const Zap: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

// CSS Styles
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: #f0f4f8;
  font-family: 'Inter', sans-serif;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Container */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

/* Logo */
.header-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #4f46e5;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  transition: color 0.3s ease;
}

.header-logo:hover {
  color: #3f38c9;
}

.logo-icon {
  width: 2.25rem;
  height: 2.25rem;
  margin-right: 0.5rem;
}

/* Card */
.auth-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  animation: fadeInUp .8s ease-out;
}

.title {
  font-size: 1.75rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Form */
.input {
  padding: 0.75rem 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 1rem;
  width: 100%;
}

.input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79,70,229,0.2);
}

.btn {
  padding: 0.75rem 1rem;
  background-color: #4f46e5;
  color: white;
  width: 100%;
  border: none;
  font-size: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  margin-top: 0.5rem;
}

.btn:disabled {
  opacity: .7;
  cursor: not-allowed;
}

.error-message {
  color: #dc2626;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
}

/* Google box */
.google-box {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
}
`;

export default function Login() {

  // 🔥 Facebook Login Handler
  const handleFacebookLogin = async () => {
    try {
      const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;
      const API_URL = import.meta.env.VITE_API_URL;
      
      console.log("🔵 Facebook Login - Config:", { FACEBOOK_APP_ID, API_URL });
      
      if (!FACEBOOK_APP_ID) {
        alert("Facebook App ID not configured");
        return;
      }
      
      if (!API_URL) {
        alert("API URL not configured");
        return;
      }

      // Redirect to backend Facebook auth endpoint
      const redirectUrl = `${API_URL}/auth/facebook`;
      console.log("🔵 Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
    } catch (err: any) {
      console.error("🔵 Facebook login error:", err);
      alert(err?.message || "Facebook login error - check console for details");
    }
  };

  // 🔥 GitHub Login Handler
  const handleGitHubLogin = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      
      console.log("🟣 GitHub Login - Config:", { API_URL });
      
      if (!API_URL) {
        alert("API URL not configured");
        return;
      }

      // Redirect to backend GitHub auth endpoint
      const redirectUrl = `${API_URL}/auth/github`;
      console.log("🟣 Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
    } catch (err: any) {
      console.error("🟣 GitHub login error:", err);
      alert(err?.message || "GitHub login error - check console for details");
    }
  };

  // 🔥 Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      
      console.log("🟡 Google Login - Config:", { API_URL });
      
      if (!API_URL) {
        alert("API URL not configured");
        return;
      }

      // Redirect to backend Google auth endpoint (OAuth redirect flow)
      const redirectUrl = `${API_URL}/auth/google`;
      console.log("🟡 Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
    } catch (err: any) {
      console.error("🟡 Google login error:", err);
      alert(err?.message || "Google login error - check console for details");
    }
  };

  return (
    <div className="login-container">
      <style>{styles}</style>

      {/* Logo */}
      <Link to="/" className="header-logo">
        <Zap className="logo-icon" />
        FocusAI
      </Link>

      <div className="auth-card">
        <h2 className="title">Login to your Account</h2>

        {/* GOOGLE SIGN IN */}
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#FFFFFF",
              color: "#4285F4",
              border: "2px solid #4285F4",
              borderRadius: "0.75rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F3F3F3";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(66,133,244,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <GoogleIcon style={{ fontSize: "1.1rem" }} />
            <span>Login with Google</span>
          </button>
        </div>

        {/* FACEBOOK SIGN IN */}
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <button
            type="button"
            onClick={handleFacebookLogin}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#FFFFFF",
              color: "#1877F2",
              border: "2px solid #1877F2",
              borderRadius: "0.75rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F0F2F5";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(24,119,242,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaFacebookF style={{ fontSize: "1.1rem" }} />
            <span>Login with Facebook</span>
          </button>
        </div>

        {/* GITHUB SIGN IN */}
        <div style={{ marginTop: "0.75rem", textAlign: "center" }}>
          <button
            type="button"
            onClick={handleGitHubLogin}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#1f2937",
              color: "#FFFFFF",
              border: "2px solid #1f2937",
              borderRadius: "0.75rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#111827";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(31,41,55,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1f2937";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaGithub style={{ fontSize: "1.1rem" }} />
            <span>Login with GitHub</span>
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
