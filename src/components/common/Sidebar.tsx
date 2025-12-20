import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar(){
  const { user } = useContext(AuthContext);
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
