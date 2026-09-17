'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const words = textEl.querySelectorAll('.wd');
    gsap.set(words, { opacity: 0.15 });

    const st = gsap.to(words, {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: textEl,
        start: 'top 80%',
        end: 'bottom 45%',
        scrub: true,
      },
    });

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#services');
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const words = [
    { text: "We're", highlight: false },
    { text: 'not', highlight: false },
    { text: 'here', highlight: false },
    { text: 'to', highlight: false },
    { text: 'chase', highlight: false },
    { text: 'vanity', highlight: false },
    { text: 'metrics.', highlight: false },
    { text: "We're", highlight: false },
    { text: 'here', highlight: false },
    { text: 'to', highlight: false },
    { text: 'build', highlight: false },
    { text: 'growth', highlight: true },
    { text: 'engines', highlight: true },
    { text: 'that', highlight: true },
    { text: 'compound', highlight: true },
    { text: '—', highlight: false },
    { text: 'ruthless', highlight: false },
    { text: 'performance', highlight: false },
    { text: 'marketing', highlight: false },
    { text: 'fused', highlight: false },
    { text: 'with', highlight: false },
    { text: 'brand', highlight: false },
    { text: 'craft', highlight: false },
    { text: 'people', highlight: false },
    { text: 'actually', highlight: false },
    { text: 'remember.', highlight: false },
  ];

  return (
    <section className="manifesto" id="studio" ref={sectionRef}>
      <div className="wrap">
        <span className="sec-label">01 — The studio</span>

        <p className="mani-text display" ref={textRef}>
          {words.map((item, index) => (
            <span
              key={index}
              className={`wd ${item.highlight ? 'ital' : ''}`}
              style={{ marginRight: '0.22em' }}
            >
              {item.text}
            </span>
          ))}
        </p>

        <div className="mani-foot">
          <p className="mani-note">
            Every click has a purpose. Every rupee of ad spend is accountable. We build 
            customized, high-converting digital marketing engines for businesses, local leaders, 
            e-commerce brands, and startups ready to dominate.
          </p>
          <a href="#services" onClick={handleServicesClick} className="link-arrow">
            How we work <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
