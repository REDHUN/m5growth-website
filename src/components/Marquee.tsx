'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mqTween = gsap.to(track, {
      xPercent: -50,
      duration: 26,
      ease: 'none',
      repeat: -1,
    });

    const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3' });
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    const st = ScrollTrigger.create({
      onUpdate(self) {
        const v = self.getVelocity();
        if (Math.abs(v) > 60 && mqTween) {
          mqTween.timeScale(Math.min(4, 1 + Math.abs(v) / 900));
          clearTimeout(timer1);
          timer1 = setTimeout(() => {
            gsap.to(mqTween, { timeScale: 1, duration: 1 });
          }, 140);
        }
        skewTo(gsap.utils.clamp(-8, 8, v / -250));
        clearTimeout(timer2);
        timer2 = setTimeout(() => skewTo(0), 140);
      },
    });

    return () => {
      st.kill();
      mqTween.kill();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const Star = () => (
    <svg className="mq-star" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
    </svg>
  );

  const Group = () => (
    <div className="mq-group">
      <span className="mq-item">Brand Strategy</span>
      <Star />
      <span className="mq-item ital">Performance Ads</span>
      <Star />
      <span className="mq-item">SEO &amp; Content</span>
      <Star />
      <span className="mq-item ital">Social &amp; Creators</span>
      <Star />
      <span className="mq-item">Web Experiences</span>
      <Star />
      <span className="mq-item ital">Analytics &amp; CRO</span>
      <Star />
    </div>
  );

  return (
    <section className="mq-section" aria-hidden="true">
      <div ref={trackRef} className="mq-track">
        <Group />
        <Group />
      </div>
    </section>
  );
}
