import React from 'react';
import { useNavigate } from 'react-router-dom';

const Roadmap: React.FC = () => {
    const navigate = useNavigate();

    const roadmapItems = [
        { phase: 'Q4 2025', status: 'In Progress', features: ['AI Focus Planning', 'Sentiment Tracker', 'Voice Input Support', 'Calendar Integration'] },
        { phase: 'Q1 2026', status: 'Planned', features: ['Team Collaboration', 'Advanced Analytics Dashboard', 'Habit Integration', 'Mobile App (iOS)'] },
        { phase: 'Q2 2026', status: 'Planned', features: ['AI Goal Breakdown', 'Performance Reports', 'Smart Notifications', 'Android App'] },
        { phase: 'Q3 2026', status: 'Planned', features: ['Context-Aware Suggestions', 'Natural Language Processing', 'Advanced Filters', 'API Access'] },
    ];

    return (
        <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#f9fafb' }}>
            {/* Header */}
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40, backgroundColor: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)', height: '4rem' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                    <button onClick={() => navigate('/')} style={{ cursor: 'pointer', fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', background: 'none', border: 'none' }}>
                        ⚡ FocusAI
                    </button>
                    <button onClick={() => navigate('/')} style={{ padding: '0.5rem 1.25rem', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '9999px', fontWeight: '600', cursor: 'pointer' }}>
                        Back to Home
                    </button>
                </div>
            </header>

            {/* Content */}
            <main style={{ maxWidth: '900px', margin: '0 auto', padding: '8rem 2rem 4rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>Product Roadmap</h1>
                <p style={{ color: '#6b7280', marginBottom: '3rem' }}>Our vision for the future of FocusAI. Features and timelines subject to change based on user feedback.</p>

                <div style={{ position: 'relative' }}>
                    {roadmapItems.map((item, index) => (
                        <div key={index} style={{ marginBottom: '2rem', paddingLeft: '2rem', position: 'relative' }}>
                            {/* Timeline dot */}
                            <div style={{ position: 'absolute', left: 0, top: 0, width: '1rem', height: '1rem', backgroundColor: item.status === 'In Progress' ? '#10b981' : '#d1d5db', borderRadius: '50%', border: '4px solid white', boxShadow: '0 0 0 2px #4f46e5' }} />
                            
                            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>{item.phase}</h3>
                                    <span style={{ 
                                        padding: '0.25rem 0.75rem', 
                                        backgroundColor: item.status === 'In Progress' ? '#d1fae5' : '#fef3c7', 
                                        color: item.status === 'In Progress' ? '#065f46' : '#92400e', 
                                        borderRadius: '9999px', 
                                        fontSize: '0.875rem', 
                                        fontWeight: '600' 
                                    }}>
                                        {item.status}
                                    </span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {item.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} style={{ color: '#4b5563', marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 0, color: '#4f46e5', fontWeight: '600' }}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ padding: '2rem', backgroundColor: '#e0e7ff', borderRadius: '1rem', marginTop: '3rem' }}>
                    <h3 style={{ color: '#3730a3', fontWeight: '700', marginBottom: '0.5rem' }}>📢 Have a feature request?</h3>
                    <p style={{ color: '#3730a3' }}>We'd love to hear from you! Send us your feedback at <strong>focusai.reminder.bot@gmail.com</strong> or vote on features in our community forum.</p>
                </div>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#111827', color: 'white', padding: '2rem', marginTop: '4rem', textAlign: 'center' }}>
                <p>&copy; 2025 FocusAI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Roadmap;
