import { useState } from "react";

export default function DebugFacebook() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const testFacebookEndpoint = async () => {
    try {
      addLog("🔵 Testing backend Facebook endpoint...");
      addLog(`API_URL: ${import.meta.env.VITE_API_URL}`);

      const endpoint = `${import.meta.env.VITE_API_URL}/auth/facebook`;
      addLog(`Endpoint: ${endpoint}`);

      // Try to fetch the endpoint directly (this will fail with CORS, but we'll see the error)
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      addLog(`Status: ${response.status} ${response.statusText}`);

      const text = await response.text();
      addLog(`Response: ${text.substring(0, 500)}`);
    } catch (err: any) {
      addLog(`❌ Error: ${err.message}`);
    }
  };

  const checkEnvironment = () => {
    addLog("📋 Environment Check:");
    addLog(`VITE_FACEBOOK_APP_ID: ${import.meta.env.VITE_FACEBOOK_APP_ID ? "✅ Set" : "❌ Not set"}`);
    addLog(`VITE_API_URL: ${import.meta.env.VITE_API_URL}`);
    addLog(`VITE_GOOGLE_CLIENT_ID: ${import.meta.env.VITE_GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Not set"}`);
  };

  const openFacebookAuth = () => {
    addLog("🔵 Opening Facebook auth endpoint...");
    const url = `${import.meta.env.VITE_API_URL}/auth/facebook`;
    addLog(`URL: ${url}`);
    // Don't actually redirect, just log
    addLog("(Use browser network tab to see what happens)");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "monospace" }}>
      <h1>🔵 Facebook Login Debug</h1>

      <div style={{ marginBottom: "2rem", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={checkEnvironment}
          style={{
            padding: "10px 15px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Check Environment
        </button>
        <button
          onClick={testFacebookEndpoint}
          style={{
            padding: "10px 15px",
            backgroundColor: "#1877F2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Test Backend Endpoint
        </button>
        <button
          onClick={openFacebookAuth}
          style={{
            padding: "10px 15px",
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Log Auth URL
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#1f2937",
          color: "#10b981",
          padding: "15px",
          borderRadius: "8px",
          minHeight: "300px",
          overflowY: "auto",
          fontSize: "12px",
          lineHeight: "1.6",
        }}
      >
        {logs.length === 0 ? (
          <p>Click buttons above to see debug logs...</p>
        ) : (
          logs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))
        )}
      </div>

      <div style={{ marginTop: "2rem", padding: "15px", backgroundColor: "#fee2e2", borderRadius: "8px" }}>
        <h3>📌 Next Steps:</h3>
        <ol>
          <li>Click "Check Environment" to verify config is loaded</li>
          <li>Open browser DevTools (F12) → Network tab</li>
          <li>Click "Test Backend Endpoint" to see network request</li>
          <li>Check the response status and body in Network tab</li>
          <li>Look for error messages in the response</li>
          <li>Check backend logs for detailed error info</li>
        </ol>
      </div>

      <div style={{ marginTop: "2rem", padding: "15px", backgroundColor: "#dbeafe", borderRadius: "8px" }}>
        <h3>🔍 Common Issues:</h3>
        <ul>
          <li>❌ <strong>Backend not running:</strong> Make sure backend is running on port 5000</li>
          <li>❌ <strong>Facebook strategy not configured:</strong> Check backend Passport.js setup</li>
          <li>❌ <strong>Callback URL mismatch:</strong> Backend Facebook app needs correct redirect URI</li>
          <li>❌ <strong>CORS issues:</strong> Backend needs CORS middleware enabled</li>
          <li>❌ <strong>Missing environment variables:</strong> Check backend .env for Facebook app ID/secret</li>
        </ul>
      </div>
    </div>
  );
}
