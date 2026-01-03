import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Profile.css";

interface ProfileStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
  upcomingReminders: number;
  aiUsageCount: number;
  lastActivity?: string;
}

interface ActivityLog {
  _id: string;
  action: string;
  details?: string;
  timestamp: string;
}

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [stats, setStats] = useState<ProfileStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completionRate: 0,
    upcomingReminders: 0,
    aiUsageCount: 0,
  });
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'stats' | 'activity' | 'settings'>('info');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    loadProfileData();
  }, [user]);

  const loadProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Load profile stats
      const profileRes = await fetch(
        import.meta.env.VITE_API_URL + "/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const profileData = await profileRes.json();
      
      if (profileData.stats) {
        const { totalTasks = 0, completedTasks = 0, upcomingReminders = 0, aiUsageCount = 0 } = profileData.stats;
        const pendingTasks = totalTasks - completedTasks;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        setStats({
          totalTasks,
          completedTasks,
          pendingTasks,
          completionRate,
          upcomingReminders,
          aiUsageCount,
          lastActivity: profileData.stats.lastActivity,
        });
      }

      // Load activity logs
      const activityRes = await fetch(
        import.meta.env.VITE_API_URL + "/profile/activity?page=1&limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const activityData = await activityRes.json();
      
      if (activityData.activities) {
        setActivities(activityData.activities);
      }
    } catch (error) {
      console.error("Failed to load profile data:", error);
    }
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      const body: any = { name, email };
      
      // Only include password if user wants to change it
      if (newPassword && newPassword === confirmPassword) {
        body.password = newPassword;
      } else if (newPassword && newPassword !== confirmPassword) {
        alert("New passwords don't match!");
        setLoading(false);
        return;
      }

      const res = await fetch(
        import.meta.env.VITE_API_URL + "/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      
      if (res.ok) {
        setUser(data.user);
        setNewPassword("");
        setConfirmPassword("");
        alert("✅ Profile updated successfully!");
        loadProfileData(); // Reload to get updated activity
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
        <div className="profile-header-info">
          <h1>{user?.name || "User"}</h1>
          <p className="profile-email">📧 {user?.email}</p>
          {/* <p className="profile-joined">Member since {(user as any)?.createdAt ? new Date((user as any).createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "N/A"}</p> */}
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          👤 Basic Info
        </button>
        <button
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📊 Task Stats
        </button>
        <button
          className={`tab ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          📜 Activity History
        </button>
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="profile-content">
        {/* Basic Info Tab */}
        {activeTab === 'info' && (
          <div className="tab-content">
            <div className="profile-card">
              <h2>📝 Edit Profile</h2>
              
              <div className="profile-field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="profile-field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <button className="save-btn" onClick={saveProfile} disabled={loading}>
                {loading ? "⏳ Saving..." : "💾 Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="tab-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-value">{stats.totalTasks}</div>
                <div className="stat-label">Total Tasks</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-value">{stats.completedTasks}</div>
                <div className="stat-label">Completed</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-value">{stats.pendingTasks}</div>
                <div className="stat-label">Pending</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-value">{stats.completionRate}%</div>
                <div className="stat-label">Completion Rate</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🔔</div>
                <div className="stat-value">{stats.upcomingReminders}</div>
                <div className="stat-label">Upcoming Reminders</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🤖</div>
                <div className="stat-value">{stats.aiUsageCount}</div>
                <div className="stat-label">AI Plans Generated</div>
              </div>
            </div>

            {stats.lastActivity && (
              <div className="profile-card" style={{ marginTop: '20px' }}>
                <h3>📅 Last Activity</h3>
                <p className="last-activity-time">{formatDate(stats.lastActivity)}</p>
              </div>
            )}
          </div>
        )}

        {/* Activity History Tab */}
        {activeTab === 'activity' && (
          <div className="tab-content">
            <div className="profile-card">
              <h2>📜 Recent Activity</h2>
              
              {activities.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <p>No activity history yet</p>
                </div>
              ) : (
                <div className="activity-list">
                  {activities.map((activity) => (
                    <div key={activity._id} className="activity-item">
                      <div className="activity-icon">
                        {activity.action.includes('profile') ? '👤' : 
                         activity.action.includes('task') ? '📋' : 
                         activity.action.includes('login') ? '🔑' : '📝'}
                      </div>
                      <div className="activity-details">
                        <div className="activity-action">{activity.action}</div>
                        {activity.details && (
                          <div className="activity-meta">{activity.details}</div>
                        )}
                      </div>
                      <div className="activity-time">
                        {formatRelativeTime(activity.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="tab-content">
            <div className="profile-card">
              <h2>🔐 Change Password</h2>
              
              <div className="profile-field">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div className="profile-field">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              <button 
                className="save-btn" 
                onClick={saveProfile} 
                disabled={loading || !newPassword || newPassword !== confirmPassword}
              >
                {loading ? "⏳ Updating..." : "🔐 Update Password"}
              </button>
            </div>

            <div className="profile-card" style={{ marginTop: '20px' }}>
              <h2>⚙️ Preferences</h2>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">🔔 Notifications</div>
                  <div className="setting-desc">Receive task reminders and updates</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">🌙 Dark Mode</div>
                  <div className="setting-desc">Enable dark theme (Coming soon)</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    disabled
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
