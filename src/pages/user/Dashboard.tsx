import React, { useEffect, useState } from "react";
import API from "../../api/axiosConfig";

// Service to fetch user analytics
const getAnalyticsService = () => {
    return API.get("/analytics").then(res => res.data);
};

// 2. Mock Lucide Icons (as SVG Components)
const ClipboardList: React.FC<{ size: number, className: string }> = ({ size, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="18" height="12" rx="2" ry="2"/>
        <path d="M7 15h0M7 19h0M10 15h7M10 19h7"/>
        <path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/>
    </svg>
);

const CheckCircle: React.FC<{ size: number, className: string }> = ({ size, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14 9 11"/>
    </svg>
);

const Percent: React.FC<{ size: number, className: string }> = ({ size, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19"/>
        <circle cx="6.5" cy="6.5" r="2.5"/>
        <circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
);

// --- Pure CSS Styles with Animations ---
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

    body {
        font-family: 'Inter', sans-serif;
        background-color: #f8f9fa; /* Light background */
        padding: 2rem;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        margin: 0;
    }

    /* --- Keyframes for Slide-In Animation --- */
    @keyframes slideIn {
        from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95);
        }
        to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
        }
    }

    /* --- Dashboard Layout --- */
    .dashboard-container {
        width: 100%;
        max-width: 1000px;
    }

    .dash-title {
        font-size: 2rem;
        font-weight: 800;
        color: #1a202c;
        margin-bottom: 2rem;
        border-bottom: 3px solid #4f46e5;
        padding-bottom: 0.5rem;
    }

    .loading {
        text-align: center;
        font-size: 1.25rem;
        color: #6c757d;
        padding: 4rem;
    }

    /* --- Stats Grid --- */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
    }

    /* --- Stat Card Styling --- */
    .stat-card {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border-left: 5px solid #4f46e5; /* Primary color indicator */
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.15);
    }

    .stat-card h4 {
        font-size: 1.125rem;
        font-weight: 600;
        color: #4a5568;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .stat-card p {
        font-size: 2.25rem;
        font-weight: 800;
        color: #1a202c;
        margin: 0;
    }
    
    .stat-card .icon {
        color: #4f46e5; /* Primary color for icon */
    }

    /* --- Animations Application --- */
    .slide-in {
        animation: slideIn 0.5s ease-out forwards;
        opacity: 0;
    }

    .delay1 {
        animation-delay: 0.1s;
    }

    .delay2 {
        animation-delay: 0.2s;
    }
`;

// --- Dashboard Component ---
export default function Dashboard() {
    const [stats, setStats] = useState<any>(null);

    // Fetch data on component mount
    useEffect(() => {
        getAnalyticsService().then(setStats).catch(() => {
            console.error("Failed to load dashboard statistics.");
        });
    }, []);

    return (
        <div className="dashboard-container">
            <style>{styles}</style>
            <h2 className="dash-title">Dashboard Overview</h2>

            {!stats ? (
                <p className="loading">Loading...</p>
            ) : (
                <div className="stats-grid">
                    
                    {/* Stat Card 1: Total Tasks */}
                    <div className="stat-card slide-in">
                        <ClipboardList size={40} className="icon" />
                        <h4>Total Tasks</h4>
                        <p>{stats.totalTasks}</p>
                    </div>

                    {/* Stat Card 2: Completed Tasks */}
                    <div className="stat-card slide-in delay1">
                        <CheckCircle size={40} className="icon" />
                        <h4>Completed</h4>
                        <p>{stats.completedTasks}</p>
                    </div>

                    {/* Stat Card 3: Completion Rate */}
                    <div className="stat-card slide-in delay2">
                        <Percent size={40} className="icon" />
                        <h4>Completion Rate</h4>
                        <p>{stats.completionRate}%</p>
                    </div>
                </div>
            )}
        </div>
    );
}