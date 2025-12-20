import { useState, useEffect } from "react";
import { getLoginHistoryApi } from "../../api/adminApi";
import "../../styles/admin.css";

interface LoginRecord {
  _id: string;
  userId?: any;
  email?: string;
  action: string;
  status: string;
  ip?: string;
  userAgent?: string;
  timestamp: string;
  createdAt?: string;
}

export default function AdminSecurity() {
  const [loginHistory, setLoginHistory] = useState<LoginRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<LoginRecord | null>(null);

  useEffect(() => {
    loadLoginHistory();
  }, []);

  const loadLoginHistory = async () => {
    try {
      setLoading(true);
      const response = await getLoginHistoryApi(1, 30);
      const items = response.data?.items || response.data?.loginHistory || [];
      console.debug("login history items", items);
      setLoginHistory(items);
    } catch (error) {
      console.error("Failed to load login history:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "#43e97b";
      case "failed":
        return "#ff6b6b";
      case "suspicious":
        return "#ffd93d";
      default:
        return "#999";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return "🔓";
      case "signup":
        return "👤";
      case "google-auth":
        return "🔵";
      default:
        return "🔑";
    }
  };

  const getDisplayEmail = (record: LoginRecord) => {
    const fromUserIdObjectEmail =
      typeof record.userId === "object"
        ? Object.values(record.userId).find((v) => typeof v === "string" && v.includes("@"))
        : undefined;

    const fromUserIdString =
      typeof record.userId === "string" && record.userId.includes("@") ? record.userId : undefined;

    const fromUserIdObjectId =
      typeof record.userId === "object" && (record.userId as any)?._id ? (record.userId as any)._id : undefined;

    const fromUserIdStringified =
      typeof record.userId === "object" ? JSON.stringify(record.userId) : undefined;

    const candidate =
      record.email ||
      record.userId?.email ||
      record.userId?.emailAddress ||
      record.userId?.username ||
      (typeof record.userId === "object" ? (record.userId as any)?.userEmail : undefined) ||
      (record as any)?.user?.email ||
      (record as any)?.userEmail ||
      fromUserIdObjectEmail ||
      fromUserIdString ||
      (typeof record.userId === "string" ? record.userId : undefined) ||
      fromUserIdObjectId ||
      fromUserIdStringified;

    return candidate && typeof candidate === "string" && candidate.trim().length > 0 ? candidate : "focusai.reminder.bot@gmail.com";
  };

  const getDisplayTime = (record: LoginRecord) => {
    const rawTs = record.timestamp || record.createdAt;
    const date = rawTs ? new Date(rawTs) : null;
    const valid = date && !isNaN(date.getTime());
    return valid ? date.toLocaleString() : "N/A";
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>🔒 Security & Login Logs</h2>
        <button className="refresh-btn" onClick={loadLoginHistory}>
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading security logs...</div>
      ) : (
        <div className="security-container">
          {loginHistory.length === 0 ? (
            <p className="empty-message">No login history found</p>
          ) : (
            <div className="login-history-table">
              <table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>IP Address</th>
                    <th>Time</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.map((record) => (
                    <tr key={record._id}>
                      <td>
                        <span className="action-badge">
                          {getActionIcon(record.action)} {record.action}
                        </span>
                      </td>
                      <td>{getDisplayEmail(record)}</td>
                      <td>
                        <span
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(record.status) }}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td>
                        <code>{record.ip || "N/A"}</code>
                      </td>
                      <td>{getDisplayTime(record)}</td>
                      <td>
                        <button
                          className="btn-link"
                          onClick={() => setSelectedRecord(record)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔍 Login Details</h3>
              <button className="modal-close" onClick={() => setSelectedRecord(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>Action:</strong> {selectedRecord.action}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> {getDisplayEmail(selectedRecord)}
              </div>
              <div className="detail-row">
                <strong>Status:</strong>
                <span
                  style={{
                    backgroundColor: getStatusColor(selectedRecord.status),
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    marginLeft: "8px",
                  }}
                >
                  {selectedRecord.status}
                </span>
              </div>
              <div className="detail-row">
                <strong>IP Address:</strong> <code>{selectedRecord.ip || "N/A"}</code>
              </div>
              <div className="detail-row">
                <strong>User Agent:</strong>
                <code style={{ display: "block", marginTop: "4px", fontSize: "12px", wordBreak: "break-all" }}>
                  {selectedRecord.userAgent || "N/A"}
                </code>
              </div>
              <div className="detail-row">
                <strong>Timestamp:</strong> {getDisplayTime(selectedRecord)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
