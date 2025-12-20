import React from 'react';
import { useNavigate } from 'react-router-dom';

const CookiePolicy: React.FC = () => {
    const navigate = useNavigate();

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
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>Cookie Policy</h1>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Last updated: December 15, 2025</p>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>1. What Are Cookies?</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        Cookies are small files placed on your device when you visit our platform. They help us recognize you on future visits and enhance your browsing experience.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>2. Types of Cookies We Use</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        <strong>Essential Cookies:</strong> Required for the platform to function properly, including authentication and security.<br/>
                        <strong>Analytics Cookies:</strong> Help us understand how users interact with our platform to improve features.<br/>
                        <strong>Preference Cookies:</strong> Store your preferences and settings for a personalized experience.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>3. Managing Cookies</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        You can control cookies through your browser settings. However, disabling essential cookies may affect your ability to use our platform.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>4. Third-Party Cookies</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                        Some cookies may be placed by third-party services we use, such as analytics providers. We encourage you to review their privacy policies.
                    </p>
                </section>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#111827', color: 'white', padding: '2rem', marginTop: '4rem', textAlign: 'center' }}>
                <p>&copy; 2025 FocusAI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CookiePolicy;
