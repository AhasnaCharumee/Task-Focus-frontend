import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FacebookManualTest() {
  const nav = useNavigate();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Extract token from current URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
      setMessage("✅ Token found in URL! Ready to process.");
    }
  }, []);

  const handleManualLogin = async () => {
    if (!token.trim()) {
      setMessage("❌ Please paste a token first");
      return;
    }

    try {
      setLoading(true);
      setMessage("🔵 Saving token and logging in...");

      // Save token
      localStorage.setItem("token", token);
      console.log("✅ Token saved to localStorage");

      // Try to fetch profile
      const response = await fetch("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Profile fetch failed: ${response.status}`);
      }

      const user = await response.json();
      console.log("✅ User profile fetched:", user);

      localStorage.setItem("user", JSON.stringify(user));
      setMessage("✅ Login successful! Redirecting...");

      setTimeout(() => {
        if (user.role === "admin") {
          nav("/admin/dashboard", { replace: true });
        } else {
          nav("/tasks", { replace: true });
        }
      }, 1000);
    } catch (err: any) {
      console.error("❌ Error:", err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTestBackendRedirect = () => {
    // Manually construct what the backend should redirect to
    const testToken = "test-token-12345";
    const testUrl = `http://localhost:5173/auth-callback?token=${encodeURIComponent(testToken)}&email=test@facebook.com&name=Test User`;
    setMessage(`🔵 Test redirect URL: ${testUrl}`);
    window.location.href = testUrl;
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem", fontFamily: "system-ui" }}>
      <h1>🔵 Facebook Manual Test Page</h1>

      <div style={{ backgroundColor: "#dbeafe", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
        <h3>What This Does:</h3>
        <ul>
          <li>If token is in URL, it shows automatically</li>
          <li>Lets you manually paste a token from backend logs</li>
          <li>Saves token to localStorage</li>
          <li>Fetches your profile from backend</li>
          <li>Redirects to dashboard</li>
        </ul>
      </div>

      {/* Token Input */}
      <div style={{ marginBottom: "2rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          Paste Token from Backend (or copy from URL):
        </label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          style={{
            width: "100%",
            height: "100px",
            padding: "0.75rem",
            border: "2px solid #cbd5e1",
            borderRadius: "0.5rem",
            fontFamily: "monospace",
            fontSize: "12px",
            boxSizing: "border-box"
          }}
        />
      </div>

      {/* Status Message */}
      {message && (
        <div style={{
          backgroundColor: message.includes("❌") ? "#fee2e2" : message.includes("✅") ? "#dcfce7" : "#dbeafe",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
          border: `2px solid ${message.includes("❌") ? "#dc2626" : message.includes("✅") ? "#16a34a" : "#0284c7"}`
        }}>
          <p style={{ margin: 0 }}>{message}</p>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <button
          onClick={handleManualLogin}
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Processing..." : "✅ Login with Token"}
        </button>
        <button
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            const urlToken = params.get("token");
            if (urlToken) {
              setToken(urlToken);
              setMessage("✅ Token copied from URL");
            } else {
              setMessage("❌ No token in URL");
            }
          }}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          📋 Copy from URL
        </button>
        <button
          onClick={handleTestBackendRedirect}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          🧪 Test Redirect
        </button>
      </div>

      {/* Debug Info */}
      <div style={{ backgroundColor: "#f3f4f6", padding: "1rem", borderRadius: "0.5rem" }}>
        <h3>Debug Info:</h3>
        <p><strong>Current URL:</strong> <code style={{ fontSize: "12px" }}>{window.location.href}</code></p>
        <p><strong>Token Length:</strong> {token.length} characters</p>
        <p><strong>Token in URL:</strong> {new URLSearchParams(window.location.search).get("token") ? "✅ Yes" : "❌ No"}</p>
        <p><strong>localStorage Token:</strong> {localStorage.getItem("token") ? "✅ Yes" : "❌ No"}</p>
      </div>

      {/* Instructions */}
      <div style={{ marginTop: "2rem", backgroundColor: "#fef3c7", padding: "1rem", borderRadius: "0.5rem" }}>
        <h3>How to Use:</h3>
        <ol>
          <li>Click "Facebook Login" on main page</li>
          <li>After Facebook redirects, check if token appears in URL</li>
          <li>If token is there, click "Copy from URL" button</li>
          <li>Then click "Login with Token" button</li>
          <li>You should be logged in!</li>
          <li>If not, the error message will tell you why</li>
        </ol>
      </div>
    </div>
  );
}
