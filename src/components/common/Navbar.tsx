import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { listNotifications } from "../../services/notificationService";
import useSSE from "../../hooks/useSSE";

const Zap = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const isAdminPage = location.pathname.startsWith('/admin');

  const load = async () => {
    if (!user) return;
    try {
      const notifs = await listNotifications();
      setItems(notifs.slice(0, 6));
      setUnreadCount(notifs.filter(n => !n.read).length);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, [user]);

  // SSE stream for real-time notifications
  useSSE('/api/notifications/stream', ({ type, data }: { type: string; data: any }) => {
    if (type === 'notification') {
      setItems((s) => [data, ...s].slice(0,6));
      setUnreadCount((c) => c + 1);
    }
  });

  return (
    <header className="nav">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link className="header-logo" to={isAdminPage ? "/admin" : "/"} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap className="logo-icon" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>FocusAI</span>
            {isAdminPage && (
              <span style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: 4, 
                fontSize: 11, 
                fontWeight: 600 
              }}>
                ADMIN
              </span>
            )}
          </div>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <>
              {/* <Link to="/tasks">Tasks</Link>
              <Link to="/calendar">Calendar</Link>
              <Link to="/ai/focus-plan">AI</Link>
              <Link to="/profile">Profile</Link> */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => setOpen((o) => !o)} aria-label="Notifications" style={{ position: 'relative' }}>
                  🔔
                  {unreadCount > 0 && <span style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', color: 'white', borderRadius: 999, padding: '2px 6px', fontSize: 12 }}>{unreadCount}</span>}
                </button>
                {open && (
                  <div style={{ position: 'absolute', right: 0, top: 36, width: 320, background: 'white', boxShadow: '0 6px 18px rgba(0,0,0,0.12)', borderRadius: 8, zIndex: 40 }}>
                    <div style={{ padding: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>Notifications</strong>
                        <Link to="/notifications" onClick={() => setOpen(false)}>See all</Link>
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0' }}>
                        {items.length === 0 && <li style={{ padding: 8 }}>No notifications</li>}
                        {items.map((n:any) => (
                          <li key={n._id} style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>
                            <div style={{ fontWeight: 600 }}>{n.type}</div>
                            <div style={{ fontSize: 13 }}>{n.message}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={logout} className="link-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
