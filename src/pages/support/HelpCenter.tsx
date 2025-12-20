import React from 'react';
import { useNavigate } from 'react-router-dom';

const HelpCenter: React.FC = () => {
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
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>Help Center</h1>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Find answers to your questions about FocusAI</p>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>Getting Started</h2>
                    <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
                        <h3 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem' }}>How do I create an account?</h3>
                        <p style={{ color: '#4b5563' }}>Visit our signup page and choose to sign up with Google, Facebook, or GitHub. Follow the prompts to complete your profile.</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
                        <h3 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem' }}>How do I add tasks?</h3>
                        <p style={{ color: '#4b5563' }}>After logging in, click the "Add Task" button on your dashboard. Enter task details, set a due date, and optionally add categories and labels.</p>
                    </div>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>Features</h2>
                    <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
                        <h3 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem' }}>What are recurring tasks?</h3>
                        <p style={{ color: '#4b5563' }}>Recurring tasks are tasks that repeat on a schedule (daily, weekly, monthly, etc.). Set them once and they'll automatically regenerate.</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
                        <h3 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem' }}>How do I use voice input?</h3>
                        <p style={{ color: '#4b5563' }}>Click the microphone icon next to the task input field and speak your task. Our AI will convert it to text.</p>
                    </div>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>Account & Settings</h2>
                    <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
                        <h3 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '0.5rem' }}>How do I reset my password?</h3>
                        <p style={{ color: '#4b5563' }}>Since you log in via OAuth (Google, Facebook, GitHub), your password is managed by those services. You can change it through their respective platforms.</p>
                    </div>
                </section>

                <div style={{ padding: '2rem', backgroundColor: '#e0e7ff', borderRadius: '1rem', marginTop: '3rem' }}>
                    <h3 style={{ color: '#3730a3', fontWeight: '700', marginBottom: '0.5rem' }}>Still need help?</h3>
                    <p style={{ color: '#3730a3' }}>Contact our support team at <strong>focusai.reminder.bot@gmail.com</strong></p>
                </div>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#111827', color: 'white', padding: '2rem', marginTop: '4rem', textAlign: 'center' }}>
                <p>&copy; 2025 FocusAI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HelpCenter;
