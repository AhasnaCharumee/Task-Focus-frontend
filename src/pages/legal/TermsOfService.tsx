import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>Terms of Service</h1>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Last updated: December 15, 2025</p>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        By accessing and using the FocusAI platform, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>2. User Accounts</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>3. User Conduct</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        You agree not to use the platform for any unlawful purposes or in any way that could damage, disable, or impair the service. You may not attempt to gain unauthorized access to the platform or its systems.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>4. Limitation of Liability</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                        To the fullest extent permitted by law, FocusAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>5. Changes to Terms</h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                        FocusAI reserves the right to modify these terms at any time. Changes will be effective upon posting to the platform. Your continued use of the service constitutes your acceptance of any such changes.
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

export default TermsOfService;
