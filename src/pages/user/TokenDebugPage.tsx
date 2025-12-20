import { useEffect, useState } from "react";

export default function TokenDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    // Collect all debug information
    const info = {
      url: window.location.href,
      searchParams: new URLSearchParams(window.location.search),
      queryParams: {
        token: new URLSearchParams(window.location.search).get("token"),
        email: new URLSearchParams(window.location.search).get("email"),
        name: new URLSearchParams(window.location.search).get("name"),
        error: new URLSearchParams(window.location.search).get("error"),
      },
      localStorage: {
        token: localStorage.getItem("token"),
        user: localStorage.getItem("user"),
      },
      timestamp: new Date().toLocaleTimeString(),
    };

    console.log("🔵 Token Debug Info:", info);
    setDebugInfo(info);
  }, []);

  if (!debugInfo) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "monospace" }}>
      <h1>🔵 Token Debug Page</h1>

      <div style={{ backgroundColor: "#1f2937", color: "#10b981", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ backgroundColor: debugInfo.queryParams.token ? "#dcfce7" : "#fee2e2", padding: "1rem", borderRadius: "8px" }}>
          <h3>URL Query Params</h3>
          <p><strong>Token:</strong> {debugInfo.queryParams.token ? "✅ Present" : "❌ Missing"}</p>
          <p><strong>Email:</strong> {debugInfo.queryParams.email ? "✅ Present" : "❌ Missing"}</p>
          <p><strong>Name:</strong> {debugInfo.queryParams.name ? "✅ Present" : "❌ Missing"}</p>
        </div>

        <div style={{ backgroundColor: debugInfo.localStorage.token ? "#dcfce7" : "#fee2e2", padding: "1rem", borderRadius: "8px" }}>
          <h3>LocalStorage</h3>
          <p><strong>Token:</strong> {debugInfo.localStorage.token ? "✅ Saved" : "❌ Not saved"}</p>
          <p><strong>User:</strong> {debugInfo.localStorage.user ? "✅ Saved" : "❌ Not saved"}</p>
        </div>
      </div>

      <details style={{ marginBottom: "2rem" }}>
        <summary style={{ cursor: "pointer", padding: "1rem", backgroundColor: "#e0e7ff", borderRadius: "8px" }}>
          📋 Full Debug Info
        </summary>
        <pre style={{ backgroundColor: "#f3f4f6", padding: "1rem", borderRadius: "8px", overflow: "auto" }}>
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </details>

      <div style={{ backgroundColor: "#dbeafe", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
        <h3>Next Steps:</h3>
        <ol>
          <li>If <strong>Token in URL</strong> ✅ and <strong>LocalStorage</strong> ❌ → Issue with token saving</li>
          <li>If <strong>Token in URL</strong> ❌ → Backend didn't send token parameter</li>
          <li>If <strong>LocalStorage Token</strong> ✅ → Manually click <code>Go to Dashboard</code></li>
          <li>Check console logs for error messages</li>
        </ol>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={() => {
            if (debugInfo.queryParams.token) {
              localStorage.setItem("token", debugInfo.queryParams.token);
              window.location.href = "/tasks";
            } else {
              alert("No token available!");
            }
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          🚀 Go to Dashboard
        </button>
        <button
          onClick={() => {
            console.log("Full debug info:", debugInfo);
            alert("Check console for full info!");
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          📋 Copy to Console
        </button>
      </div>

      <div style={{ backgroundColor: "#fef3c7", padding: "1rem", borderRadius: "8px" }}>
        <p><strong>💡 Tip:</strong> If token shows in URL but not in localStorage, there may be an issue with the callback processing. Try the "Go to Dashboard" button above.</p>
      </div>
    </div>
  );
}
