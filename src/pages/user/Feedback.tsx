import { useState } from "react";
import { submitFeedbackApi } from "../../api/adminApi";
import "../../styles/user-feedback.css";

export default function Feedback() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"bug" | "feature" | "suggestion">("suggestion");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please enter your feedback");
      return;
    }

    try {
      setLoading(true);
      await submitFeedbackApi(message, type);
      
      alert("✅ Thank you! Your feedback has been submitted successfully.");
      setMessage("");
      setType("suggestion");
      setSubmitted(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert("❌ Failed to submit feedback. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        {/* Header */}
        <div className="feedback-header">
          <h1>📝 Send Us Your Feedback</h1>
          <p>We value your input! Help us improve FocusAI by sharing your thoughts, ideas, and bug reports.</p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="success-banner">
            <div className="success-content">
              <span className="success-icon">✅</span>
              <div>
                <h3>Thank You!</h3>
                <p>Your feedback has been received and will be reviewed by our team.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="feedback-form-card">
          <form onSubmit={handleSubmitFeedback}>
            {/* Feedback Type */}
            <div className="form-group">
              <label htmlFor="type">📌 Feedback Type</label>
              <div className="feedback-type-selector">
                <button
                  type="button"
                  className={`type-btn ${type === "bug" ? "active" : ""}`}
                  onClick={() => setType("bug")}
                  title="Report a bug or issue"
                >
                  🐛 Bug Report
                </button>
                <button
                  type="button"
                  className={`type-btn ${type === "feature" ? "active" : ""}`}
                  onClick={() => setType("feature")}
                  title="Suggest a new feature"
                >
                  ✨ Feature Request
                </button>
                <button
                  type="button"
                  className={`type-btn ${type === "suggestion" ? "active" : ""}`}
                  onClick={() => setType("suggestion")}
                  title="Share general feedback"
                >
                  💡 Suggestion
                </button>
              </div>
            </div>

            {/* Feedback Message */}
            <div className="form-group">
              <label htmlFor="message">📬 Your Feedback</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  type === "bug"
                    ? "Describe the issue you encountered... (Include steps to reproduce if possible)"
                    : type === "feature"
                    ? "What feature would you like to see? Why would it be helpful?"
                    : "Share your thoughts, ideas, or suggestions for improvement..."
                }
                className="feedback-textarea"
                rows={6}
                maxLength={1000}
              />
              <div className="char-count">
                {message.length} / 1000 characters
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="btn-submit"
            >
              {loading ? "⏳ Submitting..." : "📤 Submit Feedback"}
            </button>
          </form>

          {/* Info Box */}
          <div className="feedback-info">
            <h3>💬 What happens next?</h3>
            <ul>
              <li>✅ Our team reviews your feedback within 24 hours</li>
              <li>🔍 We prioritize based on user impact and feasibility</li>
              <li>📈 Popular features get developed faster</li>
              <li>🎉 You'll see improvements in future updates</li>
            </ul>
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h3>💡 Tips for Better Feedback</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <h4>Be Specific</h4>
              <p>Tell us exactly what you experienced or what you'd like to see.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">📸</div>
              <h4>Add Details</h4>
              <p>Include screenshots, browser info, or steps to reproduce issues.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">🤝</div>
              <h4>Be Constructive</h4>
              <p>Focus on solutions and how changes would improve your experience.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">⏱️</div>
              <h4>Be Concise</h4>
              <p>Keep your message clear and to the point (max 1000 characters).</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h3>❓ Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Will my feedback be implemented?</h4>
              <p>We review all feedback and prioritize features based on user demand. Popular requests are prioritized!</p>
            </div>

            <div className="faq-item">
              <h4>How long does it take to respond?</h4>
              <p>We aim to review all feedback within 24 hours. Critical bug reports may receive faster responses.</p>
            </div>

            <div className="faq-item">
              <h4>Can I report a security issue?</h4>
              <p>For security issues, please email us directly instead of using this form. Security matters are handled with priority.</p>
            </div>

            <div className="faq-item">
              <h4>Can I track my feedback?</h4>
              <p>Currently, all feedback is reviewed privately by our team. Updates will be included in release notes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
