import { useState, useEffect } from "react";
import { getAnnouncementsApi, createAnnouncementApi, deleteAnnouncementApi, sendAnnouncementApi } from "../../api/adminApi";
import "../../styles/admin.css";

interface Announcement {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  scheduledFor?: string;
  sentAt?: string;
}

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    sendImmediately: true,
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await getAnnouncementsApi();
      console.log("Full announcements response:", response);
      console.log("response.data:", response.data);
      
      // Backend returns { items: [...] }
      let announcementsList = response.data?.items || [];
      console.log("Final parsed announcements:", announcementsList);
      setAnnouncements(announcementsList);
    } catch (error) {
      console.error("Failed to load announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.title.trim() || !formData.body.trim()) {
        alert("Please fill in all fields");
        return;
      }

      const createResponse = await createAnnouncementApi({
        title: formData.title,
        body: formData.body,
        sendImmediately: formData.sendImmediately,
      });
      console.log("Create announcement response:", createResponse);

      alert("✅ Announcement created successfully");
      setFormData({ title: "", body: "", sendImmediately: true });
      setShowCreateForm(false);
      await loadAnnouncements();
    } catch (error) {
      alert("❌ Failed to create announcement");
      console.error(error);
    }
  };

  const handleSendAnnouncement = async (announcementId: string) => {
    if (window.confirm("Send this announcement to all users?")) {
      try {
        await sendAnnouncementApi(announcementId);
        alert("✅ Announcement sent successfully");
        loadAnnouncements();
      } catch (error) {
        alert("❌ Failed to send announcement");
        console.error(error);
      }
    }
  };

  const handleDeleteAnnouncement = async (announcementId: string) => {
    if (window.confirm("Delete this announcement?")) {
      try {
        await deleteAnnouncementApi(announcementId);
        alert("✅ Announcement deleted");
        loadAnnouncements();
      } catch (error) {
        alert("❌ Failed to delete announcement");
        console.error(error);
      }
    }
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>📢 Announcements</h2>
        <button className="btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "❌ Cancel" : "✍️ Create Announcement"}
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="form-card">
          <h3>✍️ New Announcement</h3>
          <form onSubmit={handleCreateAnnouncement}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Announcement title"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                placeholder="Announcement message"
                className="form-textarea"
                rows={4}
              />
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="sendImmediately"
                checked={formData.sendImmediately}
                onChange={(e) => setFormData({ ...formData, sendImmediately: e.target.checked })}
              />
              <label htmlFor="sendImmediately">Send to all users immediately</label>
            </div>

            <button type="submit" className="btn-primary">
              📢 Create Announcement
            </button>
          </form>
        </div>
      )}

      {/* Announcements List */}
      {loading ? (
        <div className="loading-spinner">Loading announcements...</div>
      ) : (
        <div className="announcements-container">
          {announcements.length === 0 ? (
            <p className="empty-message">No announcements yet</p>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement._id} className="announcement-card">
                <div className="announcement-header">
                  <h3>{announcement.title}</h3>
                  {announcement.sentAt && (
                    <span className="sent-badge">✅ Sent</span>
                  )}
                </div>
                <p className="announcement-body">{announcement.body}</p>
                <div className="announcement-meta">
                  <span>
                    📅 {new Date(announcement.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="announcement-actions">
                  {!announcement.sentAt && (
                    <button
                      className="btn-secondary"
                      onClick={() => handleSendAnnouncement(announcement._id)}
                    >
                      📢 Send Now
                    </button>
                  )}
                  <button
                    className="btn-danger"
                    onClick={() => handleDeleteAnnouncement(announcement._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
