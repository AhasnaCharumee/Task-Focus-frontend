import React from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ: React.FC = () => {
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
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>Frequently Asked Questions</h1>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem' }}>General Questions</h2>
                    
                    <details style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                        <summary style={{ fontWeight: '600', color: '#1f2937' }}>What is FocusAI?</summary>
                        <p style={{ color: '#4b5563', marginTop: '1rem' }}>
                            FocusAI is an AI-powered task management platform that helps you eliminate decision fatigue by analyzing your tasks and telling you exactly what to work on next to maximize deep work.
                        </p>
                    </details>

                    <details style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                        <summary style={{ fontWeight: '600', color: '#1f2937' }}>Is FocusAI free?</summary>
                        <p style={{ color: '#4b5563', marginTop: '1rem' }}>
                            Yes! FocusAI offers a free tier with essential features. We also have premium plans with advanced analytics and AI features.
                        </p>
                    </details>

                    <details style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                        <summary style={{ fontWeight: '600', color: '#1f2937' }}>Can I use FocusAI on mobile?</summary>
                        <p style={{ color: '#4b5563', marginTop: '1rem' }}>
                            Yes, FocusAI is fully responsive and works great on mobile devices. We also offer a progressive web app (PWA) for offline access.
                        </p>
                    </details>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem' }}>Technical Questions</h2>
                    
                    <details style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                        <summary style={{ fontWeight: '600', color: '#1f2937' }}>Is my data secure?</summary>
                        <p style={{ color: '#4b5563', marginTop: '1rem' }}>
                            Yes, we use industry-standard encryption and security practices to protect your data. All communications are encrypted with SSL/TLS.
                        </p>
                    </details>

                    <details style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                        <summary style={{ fontWeight: '600', color: '#1f2937' }}>What browsers are supported?</summary>
                        <p style={{ color: '#4b5563', marginTop: '1rem' }}>
                            FocusAI works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser up to date.
                        </p>
                    </details>

                    <details style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                        <summary style={{ fontWeight: '600', color: '#1f2937' }}>Can I export my data?</summary>
                        <p style={{ color: '#4b5563', marginTop: '1rem' }}>
                            Yes! You can export your tasks and data in CSV or PDF format at any time from your account settings.
                        </p>
                    </details>
                </section>

                <div style={{ padding: '2rem', backgroundColor: '#e0e7ff', borderRadius: '1rem', marginTop: '3rem' }}>
                    <h3 style={{ color: '#3730a3', fontWeight: '700', marginBottom: '0.5rem' }}>Didn't find your answer?</h3>
                    <p style={{ color: '#3730a3' }}>Visit our <a href="/help" style={{ textDecoration: 'underline', fontWeight: '600' }}>Help Center</a> or email <strong>focusai.reminder.bot@gmail.com</strong></p>
                </div>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#111827', color: 'white', padding: '2rem', marginTop: '4rem', textAlign: 'center' }}>
                <p>&copy; 2025 FocusAI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default FAQ;
