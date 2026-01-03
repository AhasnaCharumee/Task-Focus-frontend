import { Link } from "react-router-dom";

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/tasks">📋 Tasks</Link></li>
        <li><Link to="/calendar">📅 Calendar</Link></li>
        <li><Link to="/ai/focus-plan">🎯 AI Focus Plan</Link></li>
        <li><Link to="/ai/dashboard">🤖 AI Dashboard</Link></li>
        <li><Link to="/profile">👤 Profile</Link></li>
        <li><Link to="/feedback">💬 Feedback</Link></li>
      </ul>
    </aside>
  );
}
