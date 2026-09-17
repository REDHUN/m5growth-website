'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import CaseStudyModal, { CaseStudyData } from './CaseStudyModal';

const caseStudies: CaseStudyData[] = [
  {
    id: 'case-1',
    idx: '01',
    category: 'E-commerce',
    year: '2024',
    title: 'Halcyon Skincare',
    headlineResult: '+212% YoY revenue — Paid social & CRO',
    fullDesc:
      'We rebuilt Halcyon’s direct-to-consumer acquisition architecture from scratch. By revamping creative iterations weekly, optimizing high-intent PDPs for mobile conversion, and scaling Meta & TikTok spend aggressively, we unlocked sustainable profitability.',
    img: 'https://picsum.photos/seed/m5-a/1000/900.jpg',
    metrics: [
      { label: 'YoY Revenue Growth', value: '+212%' },
      { label: 'Blended CAC Reduction', value: '-38%' },
      { label: 'Average Order Value', value: '£84 (+24%)' },
    ],
    services: ['Paid Social', 'CRO', 'Creative Direction', 'Lifecycle Email'],
  },
  {
    id: 'case-2',
    idx: '02',
    category: 'Brand launch',
    year: '2024',
    title: 'Volt Mobility',
    headlineResult: '38k pre-orders in 30 days — Brand & launch',
    fullDesc:
      'Engineered the viral go-to-market rollout for Volt’s flagship electric commuter. We led the product narrative, built an ultra-fast interactive 3D landing page, and orchestrated an influencer co-creation campaign that captivated urban commuters worldwide.',
    img: 'https://picsum.photos/seed/m5-b/1000/900.jpg',
    metrics: [
      { label: 'Global Pre-orders', value: '38,400' },
      { label: 'Waitlist Signups', value: '142,000' },
      { label: 'Top Tier PR Mentions', value: '64+' },
    ],
    services: ['Brand Strategy', 'Product Teaser', 'Paid Media', 'Web Experience'],
  },
  {
    id: 'case-3',
    idx: '03',
    category: 'Fintech',
    year: '2023',
    title: 'Nord Bank',
    headlineResult: '4.1M app installs — Performance & ASO',
    fullDesc:
      'Scaled Nord Bank’s mobile banking app across the UK and Nordics through rigorous App Store Optimization (ASO), algorithmic Google App Campaigns, and hyper-targeted Apple Search Ads with rigorous fraud prevention.',
    img: 'https://picsum.photos/seed/m5-c/1000/900.jpg',
    metrics: [
      { label: 'Verified App Installs', value: '4.1M+' },
      { label: 'First-Deposit Rate', value: '61.4%' },
      { label: 'CPI Reduction', value: '-44%' },
    ],
    services: ['ASO', 'Google Ads', 'Apple Search Ads', 'In-App Onboarding'],
  },
  {
    id: 'case-4',
    idx: '04',
    category: 'D2C food',
    year: '2023',
    title: 'Casa Verde',
    headlineResult: '6.8x blended ROAS — Content engine',
    fullDesc:
      'Established an organic-led creator ecosystem and high-converting micro-influencer affiliate program for Casa Verde organic pantry goods, creating repeatable compounding organic reach that reduced reliance on pure ad spend.',
    img: 'https://picsum.photos/seed/m5-d/1000/900.jpg',
    metrics: [
      { label: 'Blended ROAS', value: '6.8x' },
      { label: 'Monthly UGC Assets', value: '250+' },
      { label: 'Organic Search Lift', value: '+340%' },
    ],
    services: ['Creator Engine', 'Influencer Seeding', 'Organic Content', 'Meta Ads'],
  },
];

interface WorkProps {
  onShowToast?: (msg: string) => void;
}

export default function Work({ onShowToast }: WorkProps) {
  const [activeStudy, setActiveStudy] = useState<CaseStudyData | null>(null);

  const handleStudyClick = (study: CaseStudyData) => {
    setActiveStudy(study);
  };

  const handleInquireFromModal = () => {
    const target = document.querySelector('#contact');
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (onShowToast) {
      onShowToast('Ready to build your growth engine — reach out below!');
    }
  };

  return (
    <>
      <section className="work" id="work">
        <div className="wrap work-container">
          <div className="work-head">
            <div>
              <span className="sec-label">03 — Selected work</span>
              <h2 className="work-title display" style={{ marginTop: '16px' }}>
                Proof, not promises
              </h2>
            </div>
            <span className="work-count label">( 04 Featured Cases )</span>
          </div>

          <div className="work-grid">
            {caseStudies.map((item) => (
              <article
                key={item.id}
                className="work-card"
                data-cursor="view"
                tabIndex={0}
                onClick={() => handleStudyClick(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleStudyClick(item);
                }}
                aria-label={`View ${item.title} case study`}
              >
                <div className="work-media">
                  <div className="work-m-in">
                    <Image
                      src={item.img}
                      alt={`${item.title} campaign preview`}
                      width={1000}
                      height={900}
                      unoptimized
                    />
                  </div>
                  <div className="work-media-overlay">
                    <span className="work-view-badge">
                      <span>Explore Case Study</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                <div className="work-info">
                  <div className="work-top">
                    <span className="work-idx-pill">{item.idx}</span>
                    <span className="label">
                      {item.category} · {item.year}
                    </span>
                  </div>

                  <h3 className="work-name display">{item.title}</h3>
                  <span className="work-res">{item.headlineResult}</span>

                  <div className="work-tags-row">
                    {item.services.map((svc) => (
                      <span key={svc} className="work-tag-mini">{svc}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="work-cta-banner">
            <div className="work-cta-content">
              <span className="sec-label">Your Next Milestone</span>
              <p className="display work-cta-title">
                Your brand, <em>next.</em>
              </p>
              <p className="work-cta-desc">
                Partner with our studio to scale acquisition, search rankings, and brand equity.
              </p>
            </div>
            <a href="#contact" className="btn btn-black">
              <span className="roll">
                <span>Start a project</span>
                <span>Start a project</span>
              </span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <CaseStudyModal
        study={activeStudy}
        onClose={() => setActiveStudy(null)}
        onInquire={handleInquireFromModal}
      />
    </>
  );
}
