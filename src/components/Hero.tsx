'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const sq = document.querySelector('.squig path') as SVGPathElement | null;
    if (sq) {
      const length = sq.getTotalLength();
      gsap.set(sq, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(sq, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.out',
        delay: 1.6,
      });
    }

    // Rotating badge magnetic effect
    const badge = badgeRef.current;
    if (badge) {
      const onMouseMove = (e: MouseEvent) => {
        const rect = badge.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(badge, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power3' });
      };

      const onMouseLeave = () => {
        gsap.to(badge, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
      };

      badge.addEventListener('mousemove', onMouseMove);
      badge.addEventListener('mouseleave', onMouseLeave);

      return () => {
        badge.removeEventListener('mousemove', onMouseMove);
        badge.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, []);

  const handleScrollToStudio = () => {
    const target = document.querySelector('#studio');
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#work');
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="hero-top">
          <span className="label">Performance Marketing &amp; Growth Studio</span>
          <span className="label">Kerala, India · Global Reach</span>
        </div>

        <h1 className="hero-title display idle" ref={titleRef}>
          <span className="line">
            <span className="l-inner">We engineer</span>
          </span>
          <span className="line">
            <span className="l-inner">
              <em className="ital">growth</em> that{' '}
              <span className="pill hero-pill">
                <Image
                  src="https://picsum.photos/seed/m5-pill/480/360.jpg"
                  alt="Inside M5 Digital Growth Studio"
                  width={480}
                  height={360}
                  priority
                  unoptimized
                />
              </span>
            </span>
          </span>
          <span className="line">
            <span className="l-inner">
              refuses to{' '}
              <span className="underlined">
                plateau.
                <svg
                  className="squig"
                  viewBox="0 0 220 24"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 15 C 42 7, 74 21, 112 13 S 182 7, 216 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </span>
        </h1>

        <div className="hero-bottom">
          <div>
            <p className="hero-sub">
              M5 Digital Growth is a full-stack digital marketing studio based in Kerala, India.
              Performance marketing, search authority, conversion websites, and social branding engineered for brands ready to scale.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-black">
                <span className="roll">
                  <span>Start a project</span>
                  <span>Start a project</span>
                </span>
                <ArrowUpRight size={16} />
              </a>
              <a href="#work" onClick={handleScrollToWork} className="btn-ghost">
                See selected work <ArrowDown size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="hero-badge"
        id="heroBadge"
        ref={badgeRef}
        role="button"
        aria-label="Scroll to studio section"
        tabIndex={0}
        onClick={handleScrollToStudio}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleScrollToStudio();
        }}
      >
        <svg className="badge-rot" viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <path
              id="circPath"
              d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
            />
          </defs>
          <text>
            <textPath href="#circPath" textLength="294">
              SCROLL TO EXPLORE — M5 GROWTH —
            </textPath>
          </text>
        </svg>
        <span className="badge-ic">
          <ArrowDown size={18} />
        </span>
      </div>
    </section>
  );
}
