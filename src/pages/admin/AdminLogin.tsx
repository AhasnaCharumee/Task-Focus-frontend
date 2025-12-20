import React, { useState, useContext } from "react";
import { adminLoginService } from "../../services/adminService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: any = await adminLoginService({ email, password });

      // MUST contain role=admin
      if (!res?.user || res.user.role !== "admin") {
        alert("Not an admin account");
        return;
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setUser(res.user);

      // direct redirect
      nav("/admin/dashboard", { replace: true });

    } catch (err) {
      alert("Admin login failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Admin Login</h2>
      <form onSubmit={login}>
        <input
          placeholder="admin email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="admin password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
