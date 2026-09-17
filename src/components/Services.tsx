'use client';

import { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  Infinity as InfinityIcon, 
  FileText, 
  Palette, 
  Monitor, 
  Smartphone, 
  PlayCircle, 
  Users, 
  BarChart3, 
  Plus, 
  Minus, 
  ArrowUpRight, 
  LayoutGrid, 
  ListFilter,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ServiceItem {
  id: string;
  idx: string;
  name: string;
  tagline: string;
  desc: string;
  icon: typeof Megaphone;
  tags: string[];
  deliverables: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: 'svc-social-media',
    idx: '01',
    name: 'Social Media Marketing',
    tagline: 'Engage. Grow. Convert.',
    desc: 'End-to-end organic and viral social media growth. We build high-converting content engines, foster genuine community loyalty, and turn followers into paying customers across all key platforms.',
    icon: Megaphone,
    tags: ['Content Strategy', 'Audience Growth', 'Community Management', 'Viral Reels', 'Conversion Funnels'],
    deliverables: [
      'Strategic Monthly Content Planning',
      'High-Engagement Carousel & Post Design',
      'Viral Short-Form Reels Execution',
      'Community Management & Inbound Funnels'
    ],
  },
  {
    id: 'svc-seo',
    idx: '02',
    name: 'Search Engine Optimization (SEO)',
    tagline: 'Rank Higher. Get Found.',
    desc: 'Full-spectrum technical, on-page, and authority SEO engineered to dominate search results. We capture high-intent buyers exactly when they are searching for what you offer.',
    icon: Search,
    tags: ['Technical SEO', 'Keyword Strategy', 'Google Maps & Local SEO', 'High-Authority Backlinks', 'Content Optimization'],
    deliverables: [
      'Comprehensive Technical Site Audits',
      'High-Intent Commercial Keyword Mapping',
      'Google Business Profile & Local Domination',
      'High-Authority Digital PR & Link Acquisition'
    ],
  },
  {
    id: 'svc-meta-ads',
    idx: '03',
    name: 'Meta Ads (Facebook & Instagram)',
    tagline: 'Target. Reach. Get Results.',
    desc: 'High-performance paid advertising campaigns built for profitable ROAS. Precision demographic targeting, multi-variant creative testing, and ruthless budget allocation that scales revenue.',
    icon: InfinityIcon,
    tags: ['Targeted Campaigns', 'High-ROAS Scaling', 'Dynamic Retargeting', 'Creative A/B Testing', 'Ad Spend Optimization'],
    deliverables: [
      'Full-Funnel Meta Ad Campaigns',
      'Custom & Lookalike Audience Modeling',
      'Rapid Creative & Hook Iteration',
      'Conversion API (CAPI) & Pixel Setup'
    ],
  },
  {
    id: 'svc-content-marketing',
    idx: '04',
    name: 'Content Marketing',
    tagline: 'Stories that Sell.',
    desc: 'Strategic brand storytelling and conversion copywriting that educate, inspire, and persuade. We craft compelling assets that guide prospective clients seamlessly through your sales funnel.',
    icon: FileText,
    tags: ['Brand Storytelling', 'Conversion Copywriting', 'Lead Magnets', 'Blogs & Articles', 'Email Marketing'],
    deliverables: [
      'Brand Editorial & Thought Leadership',
      'High-Converting Landing Page Copy',
      'Lead Magnets, Whitepapers & E-books',
      'Nurture Email Sequences & Newsletters'
    ],
  },
  {
    id: 'svc-graphic-design',
    idx: '05',
    name: 'Graphic Design & Branding',
    tagline: 'A Visual Identity that Stands Out.',
    desc: 'Distinctive visual identities, memorable logos, and comprehensive design systems. We craft premium aesthetics that separate your business from competitors and build lasting brand equity.',
    icon: Palette,
    tags: ['Brand Guidelines', 'Logo Design', 'Social Creatives', 'Marketing Collateral', 'Packaging & Print'],
    deliverables: [
      'Complete Brand Identity Kits & Guidelines',
      'Custom Vector Logos & Typography',
      'High-End Social Media Design Templates',
      'Marketing Decks, Collateral & Print Packaging'
    ],
  },
  {
    id: 'svc-website-dev',
    idx: '06',
    name: 'Website Development',
    tagline: 'Modern. Fast. Conversion Focused.',
    desc: 'Modern, blazing-fast, and responsive web experiences built with cutting-edge frameworks. Designed with conversion architecture to turn visitors into qualified leads and sales.',
    icon: Monitor,
    tags: ['Next.js & React', 'High-Converting Landing Pages', 'E-Commerce Solutions', 'Speed & Performance', 'CRO & UX Design'],
    deliverables: [
      'Custom Next.js & React Architecture',
      'Mobile-First Responsive UX/UI',
      'Sub-Second Load Times & Core Web Vitals',
      'Conversion-Optimized Landing Page Funnels'
    ],
  },
  {
    id: 'svc-mobile-app',
    idx: '07',
    name: 'Mobile App Development',
    tagline: 'Ideas into Powerful Apps.',
    desc: 'Intuitive, scalable mobile applications engineered for both iOS and Android. Seamless user journeys, robust backend integrations, and frictionless digital product experiences.',
    icon: Smartphone,
    tags: ['iOS & Android Apps', 'React Native & Flutter', 'App UI/UX Design', 'API Integration', 'App Store Optimization'],
    deliverables: [
      'Cross-Platform iOS & Android Development',
      'Interactive Figma UI/UX Prototypes',
      'Secure Cloud APIs & Database Integration',
      'App Store & Play Store Launch Management'
    ],
  },
  {
    id: 'svc-video-production',
    idx: '08',
    name: 'Video Production & Editing',
    tagline: 'Impactful Videos that Perform.',
    desc: 'High-impact short-form reels, commercial brand films, and motion graphics tailored for maximum retention. We create visual content that commands attention in fast-scrolling feeds.',
    icon: PlayCircle,
    tags: ['Viral Short-Form Reels', 'Commercial Ad Films', 'Motion Graphics & 3D', 'Product Showcases', 'Post-Production'],
    deliverables: [
      'High-Paced 4K Reel & TikTok Production',
      'Commercial Ad Videos & Brand Stories',
      'Motion Typography & Animated Hooks',
      'Sound Design, Color Grading & Captions'
    ],
  },
  {
    id: 'svc-influencer-marketing',
    idx: '09',
    name: 'Influencer Marketing',
    tagline: 'Real People. Real Results.',
    desc: 'Authentic creator seeding and strategic influencer partnerships that build undeniable social proof, tap into hyper-targeted demographics, and drive measurable return on investment.',
    icon: Users,
    tags: ['Creator Seeding', 'Influencer Outreach', 'UGC Campaigns', 'Sponsored Collabs', 'Performance Tracking'],
    deliverables: [
      'Targeted Niche Creator Matchmaking',
      'Contract Negotiation & Brief Management',
      'User-Generated Content (UGC) Pipelines',
      'Trackable Promo Codes & Attribution'
    ],
  },
  {
    id: 'svc-analytics',
    idx: '10',
    name: 'Analytics & Reporting',
    tagline: 'Measure. Improve. Grow.',
    desc: 'Transparent real-time reporting dashboards and full-funnel attribution tracking. We translate complex data into clear, actionable growth insights to continually optimize marketing ROI.',
    icon: BarChart3,
    tags: ['GA4 & Pixel Setup', 'Conversion Tracking', 'ROI Dashboards', 'Attribution Modeling', 'Data-Driven Growth'],
    deliverables: [
      '24/7 Custom Live Performance Dashboards',
      'Multi-Touch Attribution Auditing',
      'Weekly Executive Growth Reports',
      'Conversion Rate Funnel Optimization'
    ],
  },
];

export default function Services() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCardModal, setActiveCardModal] = useState<ServiceItem | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactScroll = (serviceName?: string) => {
    const target = document.querySelector('#contact');
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="services" id="services">
      <div className="wrap">
        {/* Top Badges Banner matching graphic */}
        <div className="services-pill-banner">
          <div className="services-pill-tag">
            <span className="services-pill-dot" />
            <span>Brands · People · Growth</span>
          </div>
          <div className="services-pill-tag highlight">
            <Sparkles size={13} />
            <span>Growth Beyond Limits</span>
          </div>
          <div className="services-pill-tag">
            <span className="services-pill-dot" />
            <span>From Ideas to Impact</span>
          </div>
          <div className="services-pill-tag desktop-only">
            <span className="services-pill-dot" />
            <span>Growing Brands Globally</span>
          </div>
        </div>

        {/* Section Header */}
        <header className="sec-head sec-head-grid services-head">
          <div>
            <div className="sec-label-group">
              <span className="sec-label">02 — Strategy Today · Bigger Tomorrow</span>
              <span className="sec-partner-label">YOUR GROWTH PARTNER</span>
            </div>
            <h2 className="sec-title display" style={{ marginTop: '16px' }}>
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="sec-lead-subtitle">
              Everything you need to grow online, under one roof.
            </p>
          </div>
          
          <div className="services-head-right">
            <p className="sec-desc">
              We help businesses grow with creative ideas, data-driven strategies and result-oriented digital solutions.
            </p>
            
            {/* View Switcher Buttons */}
            <div className="services-view-toggle">
              <button
                type="button"
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
                title="Grid View"
              >
                <LayoutGrid size={16} />
                <span>Grid View</span>
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List View"
                title="List View"
              >
                <ListFilter size={16} />
                <span>Detailed List</span>
              </button>
            </div>
          </div>
        </header>

        {/* GRID VIEW (Interactive visual cards matching the image) */}
        {viewMode === 'grid' && (
          <div className="services-grid-10">
            {servicesData.map((svc) => {
              const IconComp = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="svc-card"
                  onClick={() => setActiveCardModal(svc)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveCardModal(svc);
                  }}
                  aria-label={`View details for ${svc.name}`}
                >
                  <div className="svc-card-glow" />
                  <div className="svc-card-header">
                    <div className="svc-card-icon-badge">
                      <IconComp size={22} className="svc-icon" />
                    </div>
                    <span className="svc-card-idx">{svc.idx}</span>
                  </div>

                  <div className="svc-card-content">
                    <h3 className="svc-card-title">{svc.name}</h3>
                    <p className="svc-card-tagline">{svc.tagline}</p>
                    <p className="svc-card-short-desc">{svc.desc}</p>
                  </div>

                  <div className="svc-card-footer">
                    <div className="svc-card-tags-mini">
                      {svc.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="tag-pill-mini">{tag}</span>
                      ))}
                    </div>
                    <div className="svc-card-arrow">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* LIST / ACCORDION VIEW */}
        {viewMode === 'list' && (
          <ul className="svc-list">
            {servicesData.map((svc, index) => {
              const isOpen = openIndex === index;
              const IconComp = svc.icon;
              return (
                <li key={svc.id} className={`svc ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="svc-row"
                    aria-expanded={isOpen}
                    aria-controls={svc.id}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="svc-idx">{svc.idx}</span>
                    <div className="svc-title-group">
                      <div className="svc-title-icon-wrap">
                        <IconComp size={18} />
                      </div>
                      <div>
                        <span className="svc-name display">{svc.name}</span>
                        <span className="svc-tagline-sub">{svc.tagline}</span>
                      </div>
                    </div>
                    <span className="svc-hint label">{svc.tags.slice(0, 3).join(' · ')}</span>
                    <span className="svc-toggle">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <div className="svc-body" id={svc.id}>
                    <div className="svc-body-in">
                      <div className="svc-cont">
                        <div>
                          <p className="svc-body-desc">{svc.desc}</p>
                          <div className="svc-deliverables">
                            <span className="svc-deliv-title">Core Deliverables:</span>
                            <ul className="svc-deliv-list">
                              {svc.deliverables.map((item) => (
                                <li key={item}>
                                  <CheckCircle2 size={15} className="svc-check-icon" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <span className="svc-deliv-title">Capabilities &amp; Tools:</span>
                          <ul className="svc-tags">
                            {svc.tags.map((tag) => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
                          <div className="svc-action-cta">
                            <button
                              type="button"
                              className="btn btn-accent"
                              onClick={() => handleContactScroll(svc.name)}
                            >
                              <span>Inquire for {svc.name}</span>
                              <ArrowUpRight size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Bottom Bar Summary */}
        <div className="services-bottom-cta">
          <div className="services-bottom-text">
            <span className="sec-label">Scale Your Brand</span>
            <p className="display services-bottom-title">
              Looking for a custom tailored growth blueprint?
            </p>
          </div>
          <button
            type="button"
            className="btn btn-black"
            onClick={() => handleContactScroll()}
          >
            <span className="roll">
              <span>Schedule Strategy Call</span>
              <span>Schedule Strategy Call</span>
            </span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Modal for Service Deep Dive (Grid View Click) */}
        {activeCardModal && (
          <div
            className="svc-modal-backdrop"
            onClick={() => setActiveCardModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="svc-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="svc-modal-header">
                <div className="svc-modal-badge">
                  {(() => {
                    const ModalIcon = activeCardModal.icon;
                    return <ModalIcon size={24} />;
                  })()}
                </div>
                <div className="svc-modal-titles">
                  <div className="svc-modal-idx-row">
                    <span className="label">Service {activeCardModal.idx}</span>
                    <span className="svc-modal-tagline-highlight">{activeCardModal.tagline}</span>
                  </div>
                  <h3 className="svc-modal-title display">{activeCardModal.name}</h3>
                </div>
                <button
                  type="button"
                  className="svc-modal-close"
                  onClick={() => setActiveCardModal(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="svc-modal-body">
                <p className="svc-modal-desc">{activeCardModal.desc}</p>

                <div className="svc-modal-section">
                  <span className="svc-deliv-title">Key Execution Levers:</span>
                  <ul className="svc-modal-deliv-list">
                    {activeCardModal.deliverables.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={16} className="svc-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="svc-modal-section">
                  <span className="svc-deliv-title">Tags &amp; Channels:</span>
                  <div className="svc-tags">
                    {activeCardModal.tags.map((tag) => (
                      <span key={tag} className="tag-item">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="svc-modal-footer">
                <button
                  type="button"
                  className="btn btn-accent"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setActiveCardModal(null);
                    handleContactScroll(activeCardModal.name);
                  }}
                >
                  <span>Start with {activeCardModal.name}</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
