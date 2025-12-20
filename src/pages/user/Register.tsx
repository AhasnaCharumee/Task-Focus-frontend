import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
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

// ----------------- ICON -----------------
const Zap = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// ----------------- CSS (from CODE A) -----------------
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

    body {
        margin: 0;
        padding: 0;
        background-color: #f0f4f8;
        font-family: 'Inter', sans-serif;
    }

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes logoPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .register-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        width: 100%;
        max-width: 480px;
        margin: auto;
        min-height: 100vh;
    }

    .header-logo {
        display: flex;
        align-items: center;
        color: #4f46e5;
        font-size: 2rem;
        font-weight: 800;
        text-decoration: none;
        margin-bottom: 2rem;
    }

    .header-logo:hover {
        color: #4338ca;
        animation: logoPulse 0.5s ease-in-out;
    }

    .logo-icon {
        margin-right: .5rem;
    }

    .register-card {
        background: white;
        padding: 2rem;
        width: 100%;
        border-radius: 1.5rem;
        box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.05);
        border: 1px solid #e0e7ff;
    }

    .animate-card {
        animation: fadeInUp 0.8s ease-out both;
    }

    .title {
        text-align: center;
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        font-weight: 800;
        color: #1f2937;
    }

    .register-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .input {
        padding: 0.75rem;
        border-radius: 0.75rem;
        border: 2px solid #d1d5db;
        outline: none;
        font-size: 1rem;
        transition: .3s;
    }

    .input:focus {
        border-color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(79,70,229,.3);
    }

    .btn {
        padding: 0.75rem;
        background: #4f46e5;
        color: white;
        border: none;
        border-radius: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        font-size: 1rem;
        transition: .3s;
    }

    .btn:hover:not(:disabled) {
        background: #4338ca;
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(79,70,229,0.4);
    }

    .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .google-box {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }

    .google-fallback {
        width: 100%;
        text-align: center;
        margin-top: 0;
        color: #6b7280;
    }

    .switch-auth {
        margin-top: 1.2rem;
        text-align: center;
        font-size: .9rem;
        color: #4b5563;
    }

    .switch-auth a {
        color: #4f46e5;
        text-decoration: none;
        font-weight: 600;
    }

    .switch-auth a:hover {
        text-decoration: underline;
    }
`;


// --------------- FINAL REGISTER PAGE -----------------
export default function Register() {
  // Context available in scope for potential use
  useContext(AuthContext);

  // ---------- FACEBOOK SIGNUP ----------
  const handleFacebookSignup = async () => {
    try {
      const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;
      const API_URL = import.meta.env.VITE_API_URL;
      
      console.log("🔵 Facebook Signup - Config:", { FACEBOOK_APP_ID, API_URL });
      
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
      console.error("🔵 Facebook signup error:", err);
      alert(err?.message || "Facebook signup error - check console for details");
    }
  };

  // ---------- GITHUB SIGNUP ----------
  const handleGitHubSignup = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      
      console.log("🟣 GitHub Signup - Config:", { API_URL });
      
      if (!API_URL) {
        alert("API URL not configured");
        return;
      }

      // Redirect to backend GitHub auth endpoint
      const redirectUrl = `${API_URL}/auth/github`;
      console.log("🟣 Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
    } catch (err: any) {
      console.error("🟣 GitHub signup error:", err);
      alert(err?.message || "GitHub signup error - check console for details");
    }
  };

  // ---------- GOOGLE SIGNUP ----------
  const handleGoogleSignup = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      
      console.log("🟡 Google Signup - Config:", { API_URL });
      
      if (!API_URL) {
        alert("API URL not configured");
        return;
      }

      // Redirect to backend Google auth endpoint (OAuth redirect flow)
      const redirectUrl = `${API_URL}/auth/google`;
      console.log("🟡 Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
    } catch (err: any) {
      console.error("🟡 Google signup error:", err);
      alert(err?.message || "Google signup error - check console for details");
    }
  };



  return (
    <div className="register-container">
      <style>{styles}</style>

      <Link className="header-logo" to="/">
        <Zap className="logo-icon" />
        FocusAI
      </Link>

      <div className="register-card animate-card">
        <h2 className="title">Create Your Account</h2>

        {/* GOOGLE SIGN UP */}
        <button
          type="button"
          onClick={handleGoogleSignup}
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
            marginTop: "1rem",
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
          <span>Sign Up with Google</span>
        </button>

        {/* FACEBOOK SIGN UP */}
        <button
          type="button"
          onClick={handleFacebookSignup}
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
            marginTop: "1rem",
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
          <span>Sign Up with Facebook</span>
        </button>

        {/* GITHUB SIGN UP */}
        <button
          type="button"
          onClick={handleGitHubSignup}
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
            marginTop: "0.75rem",
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
          <span>Sign Up with GitHub</span>
        </button>

        <p className="switch-auth">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
