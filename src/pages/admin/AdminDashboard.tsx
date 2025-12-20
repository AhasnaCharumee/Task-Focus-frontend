import React, { useState, useEffect, useContext } from "react";
import { getDashboardStatsApi } from "../../api/adminApi";
import { AuthContext } from "../../context/AuthContext";
import AdminUsers from "../../components/admin/AdminUsers";
import AdminFeedback from "../../components/admin/AdminFeedback";
import AdminAnnouncements from "../../components/admin/AdminAnnouncements";
import AdminSettings from "../../components/admin/AdminSettings";
import AdminSecurity from "../../components/admin/AdminSecurity";
import "../../styles/admin.css";

interface DashboardStats {
  totalUsers: number;
  totalTasks: number;
  completionRate: number;
  openFeedback: number;
}

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalTasks: 0,
    completionRate: 0,
    openFeedback: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<
    "overview" | "users" | "tasks" | "feedback" | "announcements" | "settings" | "security"
  >("overview");

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await getDashboardStatsApi();
      setStats(response.data?.stats || response.data || {});
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: "👥",
      label: "Total Users",
      value: stats.totalUsers,
      color: "#667eea",
    },
    {
      icon: "📋",
      label: "Total Tasks",
      value: stats.totalTasks,
      color: "#764ba2",
    },
    {
      icon: "✅",
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      color: "#f093fb",
    },
    {
      icon: "💬",
      label: "Open Feedback",
      value: stats.openFeedback,
      color: "#4facfe",
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <div className="admin-sidebar">
        <div className="admin-logo">
          <div className="admin-logo-icon">⚡</div>
          <div>
            <h2>FocusAI</h2>
            <p style={{ fontSize: 12, margin: 0, opacity: 0.8 }}>Admin Panel</p>
          </div>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeSection === "overview" ? "active" : ""}`}
            onClick={() => setActiveSection("overview")}
          >
            📊 Dashboard
          </button>
          <button
            className={`admin-nav-item ${activeSection === "users" ? "active" : ""}`}
            onClick={() => setActiveSection("users")}
          >
            👥 Users
          </button>
          <button
            className={`admin-nav-item ${activeSection === "feedback" ? "active" : ""}`}
            onClick={() => setActiveSection("feedback")}
          >
            💬 Feedback
          </button>
          <button
            className={`admin-nav-item ${activeSection === "announcements" ? "active" : ""}`}
            onClick={() => setActiveSection("announcements")}
          >
            📢 Announcements
          </button>
          <button
            className={`admin-nav-item ${activeSection === "settings" ? "active" : ""}`}
            onClick={() => setActiveSection("settings")}
          >
            ⚙️ Settings
          </button>
          <button
            className={`admin-nav-item ${activeSection === "security" ? "active" : ""}`}
            onClick={() => setActiveSection("security")}
          >
            🔒 Security
          </button>
          <button
            className="admin-nav-item logout-btn"
            onClick={logout}
          >
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, Administrator</p>
        </div>

        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="admin-section">
            <h2>📊 Platform Overview</h2>

            {loading ? (
              <div className="loading-spinner">Loading stats...</div>
            ) : (
              <>
                {/* Stats Grid */}
                <div className="stats-grid">
                  {statCards.map((card, index) => (
                    <div
                      key={index}
                      className="stat-card"
                      style={{
                        borderTop: `4px solid ${card.color}`,
                      }}
                    >
                      <div className="stat-icon" style={{ color: card.color }}>
                        {card.icon}
                      </div>
                      <div className="stat-info">
                        <div className="stat-label">{card.label}</div>
                        <div className="stat-value">{card.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                  <h3>🚀 Quick Actions</h3>
                  <div className="actions-grid">
                    <button className="action-btn" onClick={() => setActiveSection("users")}>
                      👥 Manage Users
                    </button>
                    <button className="action-btn" onClick={() => setActiveSection("announcements")}>
                      📢 Send Announcement
                    </button>
                    <button className="action-btn" onClick={() => setActiveSection("feedback")}>
                      💬 View Feedback
                    </button>
                    <button className="action-btn" onClick={() => setActiveSection("security")}>
                      🔒 View Logs
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Users Section */}
        {activeSection === "users" && <AdminUsers />}

        {/* Feedback Section */}
        {activeSection === "feedback" && <AdminFeedback />}

        {/* Announcements Section */}
        {activeSection === "announcements" && <AdminAnnouncements />}

        {/* Settings Section */}
        {activeSection === "settings" && <AdminSettings />}

        {/* Security & Logs Section */}
        {activeSection === "security" && <AdminSecurity />}
      </div>
    </div>
  );
}
