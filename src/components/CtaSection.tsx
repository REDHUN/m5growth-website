'use client';

import { useState } from 'react';
import { 
  ArrowUpRight, 
  Send, 
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface CtaProps {
  onShowToast?: (msg: string) => void;
}

export default function CtaSection({ onShowToast }: CtaProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || (!email.trim() && !phone.trim())) {
      if (onShowToast) onShowToast('Please provide your name and contact details.');
      return;
    }

    setIsSubmitting(true);

    // Simulate inquiry submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onShowToast) {
        onShowToast('Inquiry sent successfully! Our growth team will reach out within 24 hours.');
      }
    }, 850);
  };

  return (
    <section className="cta-contact-section" id="contact" aria-label="Get In Touch and Project Inquiries">
      <div className="wrap">
        {/* Section Header */}
        <header className="sec-head sec-head-grid contact-sec-head">
          <div>
            <div className="sec-label-group">
              <span className="sec-label">04 — Get In Touch</span>
              <span className="sec-partner-label">
                <Sparkles size={11} className="label-sparkle-icon" />
                START YOUR PROJECT
              </span>
            </div>
            <h2 className="sec-title display" style={{ marginTop: '16px' }}>
              Ready to scale your <span className="text-gradient">brand?</span>
            </h2>
            <p className="sec-lead-subtitle">
              Tell us about your goals. We&apos;ll craft a tailored growth blueprint for your business.
            </p>
          </div>

          <p className="sec-desc">
            Direct access to our growth strategists, performance marketers, and creative leads in Kerala &amp; UAE.
          </p>
        </header>

        {/* Inquiry Form Card */}
        <div className="contact-form-container">
          <div className="contact-form-card">
            {isSubmitted ? (
              <div className="contact-success-box">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="display success-title">Inquiry Received!</h3>
                <p className="success-desc">
                  Thank you, <strong>{name}</strong>. We have received your project details and our team is already reviewing your brand. We will reach out within 24 hours.
                </p>
                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setCompany('');
                    setMessage('');
                  }}
                >
                  <span>Submit Another Inquiry</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-top">
                  <h3 className="form-card-title">Send a Project Brief</h3>
                  <p className="form-card-desc">
                    Fill in your project targets below. Our team in Kerala &amp; UAE will respond within 24 hours.
                  </p>
                </div>
                
                {/* Row 1: Name & Email */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Your Name <span className="req">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Mathew"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="alex@brand.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Company */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone / WhatsApp <span className="opt">(Optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company" className="form-label">
                      Company / Website <span className="opt">(Optional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="e.g. yourbrand.com"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Row 3: Message Box */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Tell us about your project &amp; goals
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describe your target outcomes, timeline, or current marketing challenges..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-black form-submit-btn"
                >
                  <span className="roll">
                    <span>{isSubmitting ? 'Sending Project Brief...' : 'Send Project Brief'}</span>
                    <span>{isSubmitting ? 'Sending Project Brief...' : 'Send Project Brief'}</span>
                  </span>
                  <Send size={16} />
                </button>

                {/* Trust Badges Bar */}
                <div className="form-trust-bar">
                  <span className="trust-item">
                    <Lock size={13} className="trust-icon" />
                    <span>NDA &amp; Privacy Protected</span>
                  </span>
                  <span className="trust-sep">·</span>
                  <span className="trust-item">
                    <Clock size={13} className="trust-icon" />
                    <span>Response under 24 Hours</span>
                  </span>
                  <span className="trust-sep">·</span>
                  <span className="trust-item">
                    <Sparkles size={13} className="trust-icon" />
                    <span>Free Strategy Assessment</span>
                  </span>
                </div>

                {/* Direct WhatsApp Quick Chat alternative */}
                <div className="form-direct-whatsapp">
                  <span>Prefer an instant conversation?</span>
                  <a
                    href="https://wa.me/918921046985?text=Hi%20M5%20Digital%20Growth%2C%20I'd%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-quick-link"
                  >
                    <MessageSquare size={14} />
                    <span>Chat directly on WhatsApp</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
