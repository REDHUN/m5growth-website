'use client';

import { useState } from 'react';
import { 
  Store, 
  ShoppingBag, 
  HeartPulse, 
  UtensilsCrossed, 
  Building2, 
  Rocket, 
  GraduationCap, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface IndustryItem {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  icon: typeof Store;
  levers: string[];
  metrics: string;
}

const industries: IndustryItem[] = [
  {
    id: 'local-business',
    title: 'Local Businesses & Retail',
    tagline: 'Dominate your local catchment area & foot traffic',
    desc: 'We optimize Google Business Profiles, run hyper-local Meta & Google Ads, and engineer localized landing pages that convert nearby searchers into paying walk-in and phone customers.',
    icon: Store,
    levers: ['Google Maps & Local SEO', 'Geo-Targeted Meta Ads', 'Call & WhatsApp Funnels', 'Review & Reputation Engine'],
    metrics: 'High-Intent Local Leads',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & D2C Brands',
    tagline: 'Scale profitable ROAS and repeat purchase rate',
    desc: 'From full-funnel Meta & Google Shopping ads to conversion-rate-optimized Shopify stores and retention email marketing, we turn ad spend into predictable revenue.',
    icon: ShoppingBag,
    levers: ['Performance Paid Ads (Meta / Google)', 'CRO Landing Page Design', 'Retention & WhatsApp Flows', 'Influencer & Creator Creative'],
    metrics: 'Profitable ROAS & Scale',
  },
  {
    id: 'healthcare',
    title: 'Clinics & Healthcare',
    tagline: 'Build authority, patient trust & appointment bookings',
    desc: 'We help doctors, dental clinics, ayurvedic centers, and multi-specialty hospitals attract qualified patient inquiries with HIPAA/ethical-compliant marketing and local search authority.',
    icon: HeartPulse,
    levers: ['Doctor/Clinic Brand Authority', 'Google Search Intent Ads', 'Appointment Booking Funnels', 'Educational Reel Formats'],
    metrics: 'Direct Patient Inquiries',
  },
  {
    id: 'hospitality',
    title: 'Restaurants & Cafés',
    tagline: 'Pack tables and build a cult-like local following',
    desc: 'High-aesthetic food videography, viral Instagram Reels, influencer seeding, and location-targeted promo campaigns that keep reservations and walk-ins consistently full.',
    icon: UtensilsCrossed,
    levers: ['Cinematic Short-Form Video', 'Food Influencer Collabs', 'Zomato/Swiggy Ads Alignment', 'Weekend Event Promos'],
    metrics: 'Table Bookings & Buzz',
  },
  {
    id: 'real-estate',
    title: 'Real Estate & Builders',
    tagline: 'Generate verified buyers for luxury & residential projects',
    desc: 'Targeted high-ticket lead generation funnels, NRI marketing campaigns across GCC/UAE, and immersive project landing pages that filter out time-wasters and deliver serious site visits.',
    icon: Building2,
    levers: ['NRI & GCC Targeted Ads', 'High-Ticket Lead Qualification', 'Interactive Project Portals', 'Automated WhatsApp CRM'],
    metrics: 'Verified Site Visits',
  },
  {
    id: 'startups',
    title: 'Startups & Tech Ventures',
    tagline: 'Fast go-to-market validation and customer acquisition',
    desc: 'Aggressive growth experimentation, waitlist campaigns, product positioning, and digital PR designed to help bootstrapped and funded startups achieve early traction and scale.',
    icon: Rocket,
    levers: ['Go-To-Market (GTM) Strategy', 'Search Intent & SaaS SEO', 'High-Converting Pitch Sites', 'Growth Funnel A/B Testing'],
    metrics: 'Rapid User Growth',
  },
  {
    id: 'education',
    title: 'Educational Institutions',
    tagline: 'Drive student admissions and academy credibility',
    desc: 'Targeted seasonal admissions campaigns for colleges, competitive coaching academies, and edtech institutes looking for qualified student and parent inquiries.',
    icon: GraduationCap,
    levers: ['Admissions Drive Campaigns', 'Parent & Student Search Ads', 'Webinar / Campus Walk-In Funnels', 'Alumni Proof Campaigns'],
    metrics: 'Qualified Admissions',
  },
];

export default function WhoWeHelp() {
  const [activeTab, setActiveTab] = useState(0);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="who-we-help" id="industries" aria-label="Industries We Serve">
      <div className="wrap">
        <header className="sec-head sec-head-grid">
          <div>
            <span className="sec-label">03 — Target Markets</span>
            <h2 className="sec-title display" style={{ marginTop: '22px' }}>
              Built for businesses ready to dominate
            </h2>
          </div>
          <p className="sec-desc">
            We don’t believe in one-size-fits-all marketing. We engineer tailored growth blueprints 
            aligned with the unit economics of your specific industry.
          </p>
        </header>

        {/* Industry Selector Grid */}
        <div className="wwh-grid">
          {/* Industry Sidebar Tabs */}
          <div className="wwh-tabs" role="tablist" aria-label="Select an industry">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={ind.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`wwh-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span className="wwh-tab-icon">
                    <Icon size={20} />
                  </span>
                  <span className="wwh-tab-label">{ind.title}</span>
                  <ArrowRight size={16} className="wwh-tab-arrow" />
                </button>
              );
            })}
          </div>

          {/* Active Industry Detail Card */}
          <div className="wwh-card">
            {(() => {
              const current = industries[activeTab];
              const Icon = current.icon;
              return (
                <div className="wwh-card-inner" key={current.id}>
                  <div className="wwh-card-top">
                    <div className="wwh-card-icon-wrap">
                      <Icon size={28} />
                    </div>
                    <div>
                      <span className="label wwh-metric-badge">{current.metrics}</span>
                      <h3 className="wwh-card-title display">{current.title}</h3>
                    </div>
                  </div>

                  <p className="wwh-card-tagline">“{current.tagline}”</p>
                  <p className="wwh-card-desc">{current.desc}</p>

                  <div className="wwh-levers-wrap">
                    <span className="label" style={{ color: 'var(--ink-soft)' }}>
                      Core Growth Levers Deployed:
                    </span>
                    <ul className="wwh-levers-list">
                      {current.levers.map((lever, i) => (
                        <li key={i} className="wwh-lever-item">
                          <CheckCircle2 size={16} className="wwh-check" />
                          <span>{lever}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="wwh-card-foot">
                    <a
                      href="#contact"
                      onClick={handleContactClick}
                      className="btn btn-black wwh-cta-btn"
                    >
                      <span className="roll">
                        <span>Discuss {current.title} Growth</span>
                        <span>Discuss {current.title} Growth</span>
                      </span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
