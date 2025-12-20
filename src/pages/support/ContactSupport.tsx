import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactSupport: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

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
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}>Contact Support</h1>
                <p style={{ color: '#6b7280', marginBottom: '3rem' }}>We're here to help. Send us a message and we'll respond as soon as possible.</p>

                {submitted && (
                    <div style={{ padding: '1rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '0.5rem', marginBottom: '2rem', borderLeft: '4px solid #10b981' }}>
                        ✓ Thank you! We've received your message. We'll get back to you within 24 hours.
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Subject</label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', fontFamily: 'inherit' }}
                        >
                            <option value="">Select a subject</option>
                            <option value="bug">Report a Bug</option>
                            <option value="feature">Feature Request</option>
                            <option value="billing">Billing Issue</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ padding: '0.75rem 2rem', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}
                    >
                        Send Message
                    </button>
                </form>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
                    <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ color: '#1f2937', fontWeight: '700', marginBottom: '0.5rem' }}>📧 Email</h3>
                        <p style={{ color: '#4b5563' }}>focusai.reminder.bot@gmail.com</p>
                    </div>
                    <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ color: '#1f2937', fontWeight: '700', marginBottom: '0.5rem' }}>📞 Phone</h3>
                        <p style={{ color: '#4b5563' }}>+78-311-FOCUS-AI</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#111827', color: 'white', padding: '2rem', marginTop: '4rem', textAlign: 'center' }}>
                <p>&copy; 2025 FocusAI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ContactSupport;
