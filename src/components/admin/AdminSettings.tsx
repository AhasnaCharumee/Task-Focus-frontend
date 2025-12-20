import { useState, useEffect } from "react";
import { getSettingsApi, updateSettingApi } from "../../api/adminApi";
import "../../styles/admin.css";

interface Setting {
  key: string;
  value: any;
  description?: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await getSettingsApi();
      setSettings(response.data?.items || response.data?.settings || []);
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSetting = (setting: Setting) => {
    setEditingKey(setting.key);
    setEditValue(JSON.stringify(setting.value));
  };

  const handleSaveSetting = async (key: string) => {
    try {
      const value = editValue.startsWith("{") || editValue.startsWith("[") 
        ? JSON.parse(editValue) 
        : editValue;

      await updateSettingApi(key, value);
      alert("✅ Setting updated successfully");
      setEditingKey(null);
      loadSettings();
    } catch (error) {
      alert("❌ Failed to update setting");
      console.error(error);
    }
  };

  const commonSettings = [
    {
      key: "siteName",
      name: "Site Name",
      description: "Platform name displayed to users",
    },
    {
      key: "aiEnabled",
      name: "AI Features",
      description: "Enable/disable AI-powered features",
    },
    {
      key: "notificationsEnabled",
      name: "Notifications",
      description: "Enable/disable system notifications",
    },
    {
      key: "taskLimitPerUser",
      name: "Task Limit",
      description: "Maximum tasks per user (0 = unlimited)",
    },
    {
      key: "maintenanceMode",
      name: "Maintenance Mode",
      description: "Set platform to maintenance mode",
    },
  ];

  return (
    <div className="admin-section">
      <h2>⚙️ System Settings</h2>
      <p style={{ color: "#666", marginTop: "10px", marginBottom: "20px" }}>
        Configure platform-wide settings and features
      </p>

      {loading ? (
        <div className="loading-spinner">Loading settings...</div>
      ) : (
        <div className="settings-container">
          {commonSettings.map((setting) => {
            const currentSetting = settings.find((s) => s.key === setting.key);
            const isEditing = editingKey === setting.key;

            return (
              <div key={setting.key} className="settings-card">
                <div className="setting-header">
                  <div>
                    <h3>{setting.name}</h3>
                    <p className="setting-description">{setting.description}</p>
                  </div>
                </div>

                <div className="setting-value">
                  {isEditing ? (
                    <div className="setting-edit">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="form-input"
                        placeholder="Enter value"
                      />
                      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                        <button
                          className="btn-primary"
                          onClick={() => handleSaveSetting(setting.key)}
                        >
                          💾 Save
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={() => setEditingKey(null)}
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="setting-current-value">
                        {currentSetting
                          ? typeof currentSetting.value === "boolean"
                            ? currentSetting.value
                              ? "✅ Enabled"
                              : "❌ Disabled"
                            : String(currentSetting.value)
                          : "N/A"}
                      </span>
                      <button
                        className="btn-secondary"
                        onClick={() => handleEditSetting(currentSetting || { key: setting.key, value: "" })}
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
