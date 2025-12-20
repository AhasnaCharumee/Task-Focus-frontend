import { useState, useEffect } from "react";
import { getFeedbackApi, updateFeedbackApi } from "../../api/adminApi";
import "../../styles/admin.css";

interface Feedback {
  _id: string;
  message: string;
  type: string;
  status: string;
  userId: any;
  createdAt: string;
}

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadFeedback();
  }, [filter]);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const response = await getFeedbackApi(1, 20);
      let items = response.data?.items || response.data?.feedback || [];
      if (filter !== "all") {
        items = items.filter((f: Feedback) => f.status === filter);
      }
      setFeedback(items);
    } catch (error) {
      console.error("Failed to load feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (feedbackId: string, newStatus: string) => {
    try {
      await updateFeedbackApi(feedbackId, newStatus);
      alert("✅ Feedback status updated");
      loadFeedback();
    } catch (error) {
      alert("❌ Failed to update feedback");
      console.error(error);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "open":
        return "#4facfe";
      case "in-progress":
        return "#f093fb";
      case "resolved":
        return "#43e97b";
      case "closed":
        return "#666";
      default:
        return "#999";
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>💬 Feedback & Reports</h2>
        <div className="filter-buttons">
          {["all", "open", "in-progress", "resolved", "closed"].map((status) => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? "active" : ""}`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading feedback...</div>
      ) : (
        <div className="feedback-container">
          {feedback.length === 0 ? (
            <p className="empty-message">No feedback found</p>
          ) : (
            feedback.map((item) => (
              <div key={item._id} className="feedback-card">
                <div className="feedback-header">
                  <span
                    className="feedback-type-badge"
                    style={{ backgroundColor: item.type === "bug" ? "#ff6b6b" : item.type === "feature" ? "#4facfe" : "#ffd93d" }}
                  >
                    {item.type.toUpperCase()}
                  </span>
                  <span
                    className="feedback-status-badge"
                    style={{ backgroundColor: getStatusBadgeColor(item.status) }}
                  >
                    {item.status}
                  </span>
                  <span className="feedback-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="feedback-message">{item.message}</p>
                <div className="feedback-actions">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
