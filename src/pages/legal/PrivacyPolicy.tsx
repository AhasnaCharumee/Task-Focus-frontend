import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>Privacy Policy</h1>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Last updated: December 15, 2025</p>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>1. Introduction</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        FocusAI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>2. Information We Collect</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        We collect information you provide directly, such as when you create an account, including your name, email address, and profile information. We also automatically collect usage data, including task activities, focus sessions, and interaction patterns.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>3. How We Use Your Information</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        We use your information to provide, maintain, and improve our services, personalize your experience, send you service updates, and analyze usage patterns to enhance our platform.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>4. Data Security</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>5. Contact Us</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                        If you have questions about this Privacy Policy, please contact us at: <strong>focusai.reminder.bot@gmail.com</strong>
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

export default PrivacyPolicy;
