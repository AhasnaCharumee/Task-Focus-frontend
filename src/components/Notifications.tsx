import { useEffect, useState } from 'react';
import { listNotifications, markNotificationRead } from '../services/notificationService';
import type { Notification } from '../services/notificationService';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const items = await listNotifications();
      setNotifications(items);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    try {
      const updated = await markNotificationRead(id);
      setNotifications((s) => s.map((n) => n._id === id ? updated : n));
    } catch (e) { console.error(e); }
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>Notifications</h2>
      {loading && <p>Loading...</p>}
      {notifications.length === 0 && !loading && <p>No notifications</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notifications.map((n) => (
          <li key={n._id} style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{n.type || 'Notification'}</div>
              <div style={{ color: '#374151' }}>{n.message}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{n.createdAt}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {!n.read && <button onClick={() => markRead(n._id)}>Mark read</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
