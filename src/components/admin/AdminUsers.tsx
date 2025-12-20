import { useState, useEffect } from "react";
import { getAllUsersApi, getUserActivityApi, deleteUserApi } from "../../api/adminApi";
import "../../styles/admin.css";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  taskCount?: number;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userActivity, setUserActivity] = useState<any[]>([]);
  const [showActivityModal, setShowActivityModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [search]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsersApi(search, 1, 20);
      setUsers(response.data?.items || response.data?.users || []);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserActivity = async (userId: string) => {
    try {
      const response = await getUserActivityApi(userId, 1, 10);
      setUserActivity(response.data?.items || response.data?.activities || []);
    } catch (error) {
      console.error("Failed to load user activity:", error);
    }
  };

  const handleViewActivity = (user: User) => {
    setSelectedUser(user);
    loadUserActivity(user._id);
    setShowActivityModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserApi(userId);
        alert("✅ User deleted successfully");
        loadUsers();
      } catch (error) {
        alert("❌ Failed to delete user");
        console.error(error);
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>👥 User Management</h2>
        <input
          type="text"
          placeholder="🔍 Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading-spinner">Loading users...</div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-message">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>{user.role}</span>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-secondary"
                          onClick={() => handleViewActivity(user)}
                        >
                          📜 Activity
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Activity Modal */}
      {showActivityModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowActivityModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📜 Activity - {selectedUser.name}</h3>
              <button className="modal-close" onClick={() => setShowActivityModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {userActivity.length === 0 ? (
                <p className="empty-message">No activity found</p>
              ) : (
                <div className="activity-list">
                  {userActivity.map((activity) => (
                    <div key={activity._id} className="activity-item">
                      <div className="activity-action">{activity.action}</div>
                      {activity.details && (
                        <div className="activity-details">{activity.details}</div>
                      )}
                      <div className="activity-time">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
