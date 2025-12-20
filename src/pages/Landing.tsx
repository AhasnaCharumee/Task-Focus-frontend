import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- Type Definitions ---
interface IconProps extends React.SVGProps<SVGSVGElement> {}
type IconComponent = React.FC<IconProps>;

interface FeatureCardProps {
    icon: IconComponent;
    title: string; // This property is now explicitly known in the array type
    description: string;
    color: string;
}

// --- Inline CSS Styles ---
const styles = `
    /* Global Reset and Typography */
    .app-container {
        min-height: 100vh;
        font-family: 'Inter', sans-serif;
        background-color: #f9fafb; /* gray-50 */
    }

    /* Layout Utility */
    .max-w-7xl { max-width: 1280px; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
    .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .justify-between { justify-content: space-between; }
    .justify-center { justify-content: center; }
    .text-center { text-align: center; }
    .text-left { text-align: left; }
    .mb-8 { margin-bottom: 2rem; }
    .mb-4 { margin-bottom: 1rem; }
    .gap-12 { gap: 3rem; }
    .space-x-4 > * + * { margin-left: 1rem; }
    .space-x-3 > * + * { margin-left: 0.75rem; }
    .space-x-8 > * + * { margin-left: 2rem; }

    /* Header */
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 40;
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(8px);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        height: 4rem; /* h-16 */
    }
    .header-content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .logo {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        font-weight: 800;
        color: #1f2937; /* gray-900 */
    }
    .logo-icon { color: #4f46e5; /* indigo-600 */ margin-right: 0.5rem; width: 1.75rem; height: 1.75rem; }
    .nav-link {
        color: #4b5563; /* gray-600 */
        font-weight: 500;
        transition: color 150ms;
    }
    .nav-link:hover { color: #4f46e5; /* indigo-600 */ }
    .auth-button {
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        transition: background-color 150ms;
        font-size: 0.875rem; /* text-sm */
    }
    .signin-button {
        color: #4b5563;
    }
    .signin-button:hover { background-color: #f3f4f6; }
    .signup-button {
        background-color: #4f46e5; /* indigo-600 */
        color: white;
        font-weight: 600;
        padding: 0.5rem 1.25rem;
        box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3), 0 2px 4px -2px rgba(79, 70, 229, 0.3);
    }
    .signup-button:hover { background-color: #4338ca; /* indigo-700 */ }


    /* Hero Section */
    .hero-section {
        padding-top: 6rem; /* pt-24 */
        padding-bottom: 4rem; /* pb-16 */
        background-color: rgba(249, 250, 251, 0.7);
    }
    .hero-container {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }
    .hero-left {
        text-align: center;
    }
    .hero-tag {
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        color: #4f46e5;
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .hero-tag-icon { margin-right: 0.25rem; width: 1rem; height: 1rem; }
    .hero-title {
        font-size: 3rem; /* 5xl */
        line-height: 1.2;
        font-weight: 800;
        color: #1f2937;
        margin-bottom: 1rem;
    }
    .hero-title span { color: #4f46e5; }
    .hero-subtitle {
        font-size: 1.25rem;
        color: #4b5563;
        margin-bottom: 2rem;
        max-width: 32rem;
        margin-left: auto;
        margin-right: auto;
    }
    .hero-cta-group {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
    .primary-cta {
        background-color: #4f46e5;
        color: white;
        font-weight: 700;
        font-size: 1.125rem;
        padding: 0.75rem 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.5), 0 4px 6px -2px rgba(79, 70, 229, 0.5);
        transition: background-color 150ms, transform 150ms;
    }
    .primary-cta:hover { background-color: #4338ca; transform: scale(1.05); }

    .secondary-cta {
        background-color: white;
        color: #4f46e5;
        font-weight: 600;
        font-size: 1.125rem;
        padding: 0.75rem 2rem;
        border-radius: 0.75rem;
        border: 2px solid #e0e7ff;
        transition: background-color 150ms;
    }
    .secondary-cta:hover { background-color: #f7f7ff; }

    /* Hero Mockup (Right Visual) */
    .hero-right {
        padding: 1.5rem;
        width: 100%;
    }
    .mockup-card {
        background-color: white;
        border-radius: 1.5rem;
        box-shadow: 0 20px 50px rgba(40, 40, 60, 0.15);
        padding: 1.5rem;
        border: 4px solid #f3f4f6;
    }
    .mockup-header {
        display: flex;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    .mockup-icon {
        width: 1.5rem;
        height: 1.5rem;
        color: #4f46e5;
        margin-right: 0.75rem;
        margin-top: 0.25rem;
        flex-shrink: 0;
    }
    .mockup-title { font-size: 1.25rem; font-weight: 700; color: #1f2937; }
    .mockup-subtitle { font-size: 0.875rem; color: #6b7280; }
    .mockup-list {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .mockup-list-item {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        background-color: #f9fafb;
        border-radius: 0.75rem;
        border: 1px solid rgba(165, 180, 252, 0.5);
    }
    .list-icon { width: 1.25rem; height: 1.25rem; color: #10b981; margin-right: 0.75rem; }
    .list-text { font-weight: 500; color: #374151; }
    .list-priority {
        margin-left: auto;
        font-size: 0.75rem;
        color: #6366f1;
        font-weight: 600;
    }
    .mockup-footer { margin-top: 1rem; text-align: center; }
    .mockup-button {
        width: 100%;
        padding: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: white;
        background-color: #6366f1;
        border-radius: 0.5rem;
    }
    .mockup-button:hover { background-color: #4f46e5; }


    /* Features Section */
    .features-section {
        padding-top: 5rem;
        padding-bottom: 5rem;
        background-color: white;
    }
    .section-title {
        font-size: 2.25rem; /* 3xl */
        font-weight: 800;
        color: #1f2937;
        margin-bottom: 0.75rem;
    }
    .section-subtitle {
        font-size: 1.25rem;
        color: #6b7280;
        margin-bottom: 3rem;
    }
    .features-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    .feature-card {
        background-color: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border-top: 4px solid;
    }
    .feature-icon-wrapper {
        padding: 0.75rem;
        border-radius: 9999px;
        display: inline-block;
        margin-bottom: 1rem;
        color: white;
    }
    .feature-title { font-size: 1.25rem; font-weight: 700; color: #1f2937; margin-bottom: 0.75rem; }
    .feature-description { color: #4b5563; }

    /* CTA Section */
    .cta-section {
        padding-top: 5rem;
        padding-bottom: 5rem;
        background-color: #4f46e5; /* indigo-700 */
    }
    .cta-container {
        max-width: 64rem;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
    .cta-title { font-size: 2.25rem; font-weight: 800; color: white; margin-bottom: 1rem; }
    .cta-subtitle { font-size: 1.25rem; color: #c7d2fe; margin-bottom: 2rem; }
    .cta-button {
        background-color: #facc15; /* yellow-400 */
        color: #3730a3; /* indigo-900 */
        font-weight: 700;
        font-size: 1.25rem;
        padding: 1rem 2.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(250, 204, 21, 0.5), 0 4px 6px -2px rgba(250, 204, 21, 0.5);
        transition: background-color 150ms, transform 150ms;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .cta-button:hover { background-color: #fde047; transform: scale(1.05); }

    /* Footer */
    .footer {
        background-color: #111827; /* gray-900 */
        color: white;
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
    }
    .footer-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .footer-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        font-weight: 800;
        color: #818cf8; /* indigo-400 */
        margin-bottom: 0.5rem;
    }
    .footer-text { font-size: 0.875rem; color: #6b7280; }
    .footer-links {
        display: flex;
        gap: 1.5rem;
        font-size: 0.875rem;
        color: #9ca3af;
        margin-top: 1rem;
    }
    .footer-links a:hover { color: white; }
    .footer-section {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
    }
    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .contact-label { font-size: 0.75rem; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em; }
    .contact-value { font-size: 0.95rem; color: #e5e7eb; font-weight: 500; }
    .contact-value a { color: #818cf8; text-decoration: none; transition: color 150ms; }
    .contact-value a:hover { color: white; }
    .social-links {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 0.5rem;
    }
    .social-link {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: rgba(129, 140, 248, 0.1);
        color: #818cf8;
        text-decoration: none;
        transition: all 150ms;
        font-weight: 600;
    }
    .social-link:hover { background-color: #818cf8; color: white; }


    /* --- Responsive Adjustments (Media Queries) --- */
    @media (min-width: 640px) { /* sm breakpoint */
        .px-sm-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
    }

    @media (min-width: 768px) { /* md breakpoint */
        .features-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .header-nav { display: flex; }
        .hero-title { font-size: 3.75rem; } /* md:text-6xl */
        .hero-tag { justify-content: flex-start; }
        .hero-left { text-align: left; }
        .hero-subtitle { margin-left: 0; margin-right: 0; }
        .hero-cta-group { justify-content: flex-start; }
    }

    @media (min-width: 1024px) { /* lg breakpoint */
        .px-lg-8 { padding-left: 2rem; padding-right: 2rem; }
        .hero-container {
            flex-direction: row;
            gap: 3rem;
        }
        .hero-left { width: 50%; }
        .hero-right { width: 50%; }
        .features-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .footer-content {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            margin-top: 0;
        }
        .footer-logo { justify-content: flex-start; }
        .footer-links { margin-top: 0; }
        .footer-section { text-align: left; }
    }
`;

// --- Icon Components (Inline SVG) ---
const Zap: IconComponent = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const Clock: IconComponent = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const CheckCircle: IconComponent = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const Target: IconComponent = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
const Send: IconComponent = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);

// --- Component: Header ---
const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="max-w-7xl mx-auto px-4 px-sm-6 px-lg-8 header-content">
                {/* Logo */}
                <a href="#" className="logo">
                    <Zap className="logo-icon" />
                    FocusAI
                </a>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-8 header-nav">
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#analytics" className="nav-link">Analytics</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </nav>

                {/* Auth Buttons */}
                <div className="space-x-3">
                    <button onClick={() => navigate('/login')} className="auth-button signin-button">
                        Sign In
                    </button>
                    <button onClick={() => navigate('/register')} className="auth-button signup-button">
                        Get Started Free
                    </button>
                </div>
            </div>
        </header>
    );
};

// --- Component: Hero Section ---
const HeroSection: React.FC = () => (
    <section className="hero-section">
        <div className="max-w-7xl mx-auto px-4 px-sm-6 px-lg-8 hero-container">
            
            {/* Left Content (Text & CTA) */}
            <div className="lg-w-1/2 hero-left">
                <p className="hero-tag">
                    <Zap className="hero-tag-icon"/>
                    AI-Powered Productivity
                </p>
                <h1 className="hero-title">
                    Stop Managing, <span>Start Focusing.</span>
                </h1>
                <p className="hero-subtitle">
                    FocusAI analyzes your tasks, eliminates decision fatigue, and tells you exactly what to work on next to maximize deep work.
                </p>

                <div className="hero-cta-group">
                    <button className="primary-cta">
                        Start Your Free Trial
                    </button>
                    <button className="secondary-cta">
                        See Demo
                    </button>
                </div>
            </div>

            {/* Right Visual (Mockup) */}
            <div className="lg-w-1/2 hero-right">
                <div className="mockup-card">
                    <div className="mockup-header">
                        <Zap className="mockup-icon" />
                        <div>
                            <h3 className="mockup-title">Powerful Features</h3>
                            <p className="mockup-subtitle">Everything you need to stay focused and productive.</p>
                        </div>
                    </div>
                    
                    <div className="mockup-list">
                        {[
                            'Task Categories & Labels',
                            'Recurring Tasks (Daily/Weekly/Monthly)',
                            'Reminders & Notifications',
                            'Calendar View',
                            'Voice Input Support',
                            'Data Export/Import (CSV/PDF)',
                            'Mobile Responsive & PWA',
                            'AI Goal Breakdown',
                            'Sentiment Tracker',
                            'Habit Tracker Integration',
                            'Context Aware Suggestions'
                        ].map((feature, index) => (
                            <div key={index} className="mockup-list-item">
                                <CheckCircle className="list-icon" />
                                <span className="list-text">{feature}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mockup-footer">
                        <button className="mockup-button">
                            Explore All Features
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- Component: Features Section ---
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color }) => (
    <div className="feature-card" style={{ borderTopColor: color }}>
        <div className="feature-icon-wrapper" style={{ backgroundColor: color }}>
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
    </div>
);

const FeaturesSection: React.FC = () => {
    // FIX: Simplified the type annotation to FeatureCardProps[] to resolve the TypeScript error.
    const features: FeatureCardProps[] = [
        { icon: CheckCircle, title: "Effortless Task Management", description: "Create, organize, and track your tasks with intuitive drag-and-drop interfaces. Supports deep hierarchy and tags.", color: '#3b82f6' }, // blue-500
        { icon: Clock, title: "Smart Daily Planning", description: "Deadlines and priorities are auto-sorted. FocusAI builds a personalized plan for your entire day in seconds.", color: '#ef4444' }, // red-500
        { icon: Zap, title: "Instant AI Suggestions", description: "Get motivation, summary of your progress, or a hyper-focused next-step recommendation on demand.", color: '#6366f1' }, // indigo-500
        { icon: Target, title: "Productivity Analytics", description: "Visualize your workflow, identify distraction points, and track completion rates over time to improve.", color: '#10b981' }, // emerald-500
    ];

    return (
        <section id="features" className="features-section">
            <div className="max-w-7xl mx-auto px-4 px-sm-6 px-lg-8 text-center">
                <h2 className="section-title">
                    Features That Drive Focus
                </h2>
                <p className="section-subtitle">
                    Harness the power of AI to simplify complexity and concentrate on what matters.
                </p>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Component: Analytics Section ---
const AnalyticsSection: React.FC = () => (
    <section id="analytics" className="features-section" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto px-4 px-sm-6 px-lg-8 text-center">
            <h2 className="section-title">
                Insights & Analytics
            </h2>
            <p className="section-subtitle">
                Track your productivity with detailed analytics and actionable insights.
            </p>

            <div className="features-grid">
                {[
                    { icon: Target, title: "Task Completion Metrics", description: "Track completion rates, average time per task, and productivity trends over time.", color: '#3b82f6' },
                    { icon: Zap, title: "Energy Level Analytics", description: "Monitor your energy patterns and receive AI suggestions for optimal task scheduling.", color: '#ef4444' },
                    { icon: Clock, title: "Time Tracking", description: "Automatic time tracking for tasks with detailed reports on where your time goes.", color: '#6366f1' },
                    { icon: CheckCircle, title: "Habit Streaks", description: "Build consistency with daily habit tracking and motivation-boosting streak counts.", color: '#10b981' },
                ].map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </div>
    </section>
);

// --- Component: Call to Action (CTA) ---
const CTASection: React.FC = () => (
    <section className="cta-section">
        <div className="cta-container px-4 px-sm-6 px-lg-8">
            <h2 className="cta-title">
                Ready to Boost Your Productivity?
            </h2>
            <p className="cta-subtitle">
                Join thousands of focused users and achieve your biggest goals faster.
            </p>
            <button className="cta-button">
                <Send className="w-6 h-6 mr-2" />
                Get Started Today
            </button>
        </div>
    </section>
);

// --- Component: Footer ---
const Footer: React.FC = () => (
    <footer id="contact" className="footer">
        <div className="max-w-7xl mx-auto px-4 px-sm-6 px-lg-8 footer-content">
            <div className="footer-section">
                <div className="footer-logo">
                    <Zap className="w-6 h-6 mr-2" />
                    FocusAI
                </div>
                <p className="footer-text">© 2025 FocusAI. All rights reserved.</p>
            </div>

            <div className="footer-section">
                <div className="contact-info">
                    <div>
                        <div className="contact-label">Email</div>
                        <div className="contact-value"><a href="mailto:support@focusai.com">focusai.reminder.bot@gmail.com</a></div>
                    </div>
                    <div>
                        <div className="contact-label">Phone</div>
                        <div className="contact-value"><a href="tel:078-311-3149">+78-311-FOCUS-AI</a></div>
                    </div>
                    <div>
                        <div className="contact-label">Address</div>
                        <div className="contact-value">Fist Lane, Weligama</div>
                    </div>
                </div>
                {/* <div className="social-links">
                    <a href="#" className="social-link" title="Twitter">𝕏</a>
                    <a href="#" className="social-link" title="LinkedIn">in</a>
                    <a href="#" className="social-link" title="GitHub">gh</a>
                </div> */}
            </div>
            
            <div className="footer-section">
                <div className="contact-info">
                    <div>
                        <div className="contact-label">Legal</div>
                        <div className="footer-links" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <a href="/pages/PrivacyPolicy">Privacy Policy</a>
                            <a href="/legal/terms">Terms of Service</a>
                            <a href="/legal/cookies">Cookie Policy</a>
                        </div>
                    </div>
                </div>
                <div className="contact-info">
                    <div>
                        <div className="contact-label">Support</div>
                        <div className="footer-links" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <a href="/pages/HelpCenter">Help Center</a>
                            <a href="/pages/ContactSupport">Contact Support</a>
                            <a href="/pages/FAQ">FAQ</a>
                            <a href="/pages/Roadmap">Roadmap</a>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);


// --- Main App Component ---
const LandingPage: React.FC = () => {
    return (
        <div className="app-container">
            {/* Inline style block for pure CSS */}
            <style>{styles}</style> 
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <AnalyticsSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

// Default export required for the environment
const App: React.FC = () => <LandingPage />;
export default App;