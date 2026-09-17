'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  targetValue: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  { targetValue: 25, decimals: 0, suffix: '+', label: 'Projects Delivered' },
  { targetValue: 15, decimals: 0, suffix: '+', label: 'Businesses Scaled' },
  { targetValue: 98, decimals: 0, suffix: '%', label: 'Client Satisfaction' },
  { targetValue: 4.9, decimals: 1, suffix: '★', label: 'Client Partner Rating' },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const counters = container.querySelectorAll<HTMLSpanElement>('.count');

    // Immediately display formatted target values if reduced motion is on or fallback
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      counters.forEach((el, index) => {
        const data = statsData[index];
        el.textContent = data.targetValue.toFixed(data.decimals);
      });
      return;
    }

    const triggers: ScrollTrigger[] = [];

    counters.forEach((el, index) => {
      const data = statsData[index];
      const obj = { val: 0 };

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: data.targetValue,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = obj.val.toFixed(data.decimals);
            },
            onComplete: () => {
              el.textContent = data.targetValue.toFixed(data.decimals);
            },
          });
        },
      });

      triggers.push(st);
    });

    // Refresh triggers to ensure Lenis smooth scroll sync
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="stats" aria-label="Key Performance Statistics">
      <div className="wrap stats-grid" ref={containerRef}>
        {statsData.map((stat, index) => (
          <div key={index} className="stat">
            <span className="stat-num">
              {stat.prefix}
              <span className="count">{stat.targetValue.toFixed(stat.decimals)}</span>
              <span className="acc">{stat.suffix}</span>
            </span>
            <span className="stat-label label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
